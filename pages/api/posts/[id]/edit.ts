import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const {
        query: { id },
        session: { user },
    } = request;

    const target = await client.post.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true,
            userId: true,
            question: true
        }
    });

    if (target?.userId !== user?.id) {
        return response.json({
            ok: false
        })
    };

    response.json({
        ok: true,
        post: target
    })
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));