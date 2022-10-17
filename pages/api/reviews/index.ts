import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';
import { Product } from '@prisma/client';



async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
  if (request.method === "GET") {
    const {
      session: { user },
    } = request;

    const reviews = await client.review.findMany({
      where: {
        createdForId: user?.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            avator: true,
          },
        },
      },
    });

    response.json({
      ok: true,
      reviews,
    });
  } else if (request.method === "POST") {
    const {
      session: { user },
      body: { star, reviewMessage, sellerId, buyerId, productId },
    } = request;

    const isAlreadyExist = await client.review.findFirst({
      where: {
        productId: productId,
      },
      select: {
        id: true,
      },
    });

    if (isAlreadyExist) {
      response.json({
        ok: false,
      });
    }

    const review = await client.review.create({
      data: {
        review: reviewMessage,
        score: star,
        createdBy: {
          connect: {
            id: user?.id,
          },
        },
        createdFor: {
          connect: {
            id: sellerId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    await client.record.create({
      data: {
        user: {
          connect: {
            id: buyerId,
          },
        },
        kind: "Purchase",
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    await client.record.create({
      data: {
        user: {
          connect: {
            id: sellerId,
          },
        },
        kind: "Sale",
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    response.json({
      ok: true,
      review,
    });
  }
}

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    fn: handler,
  })
);