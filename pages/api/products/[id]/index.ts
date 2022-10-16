import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
  if (request.method === "GET") {
    const {
      query: { id },
      session: { user },
    } = request;

    if (Number.isNaN(id)) {
      return response.json({
        ok: false,
      });
    }

    const product = await client.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avator: true,
            loginType: true,
          },
        },
        review: true,
      },
    });

    const terms = product?.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));

    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: product?.id,
          },
        },
      },
    });

    const isLiked = Boolean(
      await client.record.findFirst({
        where: {
          kind: "Fav",
          productId: product?.id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    return response.json({
      ok: true,
      product,
      relatedProducts,
      isLiked,
    });
  } else if (request.method === "DELETE") {
    const {
      query: { id },
      session: { user },
    } = request;

    const targetProduct = await client.product.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (targetProduct?.userId !== user?.id) {
      return response.json({
        ok: false,
      });
    }

    await client.product.delete({
      where: {
        id: Number(id),
      },
    });

    return response.json({
      ok: true,
    });
  } else if (request.method === "PATCH") {
    const {
      body: { name, price, description, photo },
      session: { user },
      query: { id },
    } = request;

    const targetProduct = await client.product.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (user?.id !== targetProduct?.userId) {
      return response.json({
        ok: false,
      });
    }

    const updateProduct = await client.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price: Number(price),
        description,
        image: photo,
      },
    });

    response.json({
      ok: true,
      updateProduct,
    });
  }
}

export default withApiSession(
  withHandler({
    method: ["GET", "DELETE", "PATCH"],
    fn: handler,
  })
);