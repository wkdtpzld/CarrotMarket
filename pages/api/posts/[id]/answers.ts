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
        body: {answer}
    } = request;

    const post = await client.post.findUnique({
        where: {
            id: Number(id)
        },
        select: {
            id: true
        }
    });

    if (!post) {
        response.status(404).end();
    };

    await client.answer.create({
        data: {
            user: {
                connect: {
                    id: user?.id
                }
            },
            post: {
                connect: {
                    id: Number(id)
                }
            },
            answer
        }
    })

    response.json({
        ok: true
    })
}

export default withApiSession(withHandler({
    method: ["POST"],
    fn: handler,
}));