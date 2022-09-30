import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const { query: { id }, session: { user } } = request;

    const post = await client.post.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avator: true
                }
            },
            answers: {
                select: {
                    answer: true,
                    id: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avator: true
                        }
                    }
                }
            },
            _count: {
                select: {
                    answers: true,
                    wondering: true
                }
            }
        },
        
    });

    const isWondering = Boolean(await client.wondering.findFirst({
        where: {
            postId: Number(id),
            userId: user?.id
        },
        select: {
            id: true
        }
    }))

    response.json({
        ok: true,
        post,
        isWondering
    })
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));