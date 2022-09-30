import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const { body: { question }, session: { user } } = request;
    
    if (request.method === "POST") {
        const post = await client.post.create({
            data: {
                question,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        });

        response.json({
            ok: true,
            post
        });

    } else if (request.method === "GET") {
        const posts = await client.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avator: true
                    }
                },
                _count: {
                    select: {
                        answers: true,
                        wondering: true
                    }
                }
            }
        });

        response.json({
            ok: true,
            posts
        })
    }



}

export default withApiSession(withHandler({
    method: ["POST", "GET"],
    fn: handler,
}));