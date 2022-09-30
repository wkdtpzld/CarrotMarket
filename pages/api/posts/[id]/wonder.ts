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
        session: { user }
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

    const alreadyExists = await client.wondering.findFirst({
        where: {
            userId: user?.id,
            postId: Number(id)
        },
        select: {
            id: true
        }
    });

    if (alreadyExists) {
        await client.wondering.delete({
            where: {
                id: alreadyExists.id
            }
        })
    } else {
        await client.wondering.create({
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
                }
            },
        })
    };

    response.json({
        ok: true
    })
}

export default withApiSession(withHandler({
    method: ["POST"],
    fn: handler,
}));