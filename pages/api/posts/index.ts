import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    if (request.method === "POST") {

        const {
            body: { question, latitude, longitude },
            session: { user }
        } = request;

        const post = await client.post.create({
            data: {
                question,
                latitude,
                longitude,
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

        const { query: { latitude, longitude, level, page } } = request;

        const levelFloat = parseFloat(level?.toString()!);
        const latitudeFloat = parseFloat(latitude?.toString()!);
        const longitudeFloat = parseFloat(longitude?.toString()!);

        const postCount = await client.post.count();
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
            },
            where: {
                latitude: {
                    gte: latitudeFloat - levelFloat,
                    lte: latitudeFloat + levelFloat
                },
                longitude: {
                    gte: longitudeFloat - levelFloat,
                    lte: longitudeFloat + levelFloat
                }
            },
            take: 10,
            
        });

        response.json({
            ok: true,
            posts,
            pages: Math.ceil(postCount / 10)
        })
    }
}

export default withApiSession(withHandler({
    method: ["POST", "GET"],
    fn: handler,
}));