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
    } else if (request.method === "DELETE") {
        const { query: { id }, session: { user } } = request;

        const targetPost = await client.post.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                userId: true
            }
        });

        if (targetPost?.userId !== user?.id) {
            return response.status(401).json({
                ok: false
            });
        }

        await client.post.delete({
            where: {
                id: Number(id)
            }
        });

        return response.json({
            ok: true
        });
    } else if (request.method === "PATCH") {
        const {
            body: { message },
            query: { id },
            session: { user }
        } = request

        const targetPost = await client.post.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                userId: true
            }
        });

        if (user?.id !== targetPost?.userId) {
            return response.json({
                ok: false
            });
        };

        const updatePost = await client.post.update({
            where: {
                id: Number(id)
            },
            data: {
                question: message
            }
        });

        response.json({
            ok: true,
            updatePost
        });
    }
    
}

export default withApiSession(withHandler({
    method: ["GET","DELETE","PATCH"],
    fn: handler,
}));