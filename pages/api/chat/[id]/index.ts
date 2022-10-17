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
      session: { user },
      query: { id },
    } = request;

    const isOwner = Boolean(
      await client.chatRoom.findFirst({
        where: {
          OR: [
            {
              buyerId: user?.id,
            },
            {
              sellerId: user?.id,
            },
          ],
        },
      })
    );

    if (!isOwner) return response.json({ ok: false });

    const messages = await client.chatRoom.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        message: {
          select: {
            message: true,
            user: {
              select: {
                avator: true,
                id: true,
                loginType: true,
              },
            },
            id: true,
          },
        },
        product: {
          include: {
            reservation: true,
          },
        },
      },
    });

    const isDone = Boolean(
      await client.review.findFirst({
        where: {
          productId: messages?.productId,
        },
        select: {
          id: true,
        },
      })
    );

    if (isDone) {
      return response.json({
        ok: true,
        messages,
        isDone: true,
      });
    }

    const TargetUser = await client.user.findUnique({
      where: {
        id: request.session.user?.id,
      },
    });

    response.json({
      ok: true,
      messages,
      user: TargetUser
    });
  }
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));