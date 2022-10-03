import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

declare module "iron-session" {

    interface IronSessionData {
        user?: {
            id: number
        }
    }
}

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const {
        session: { user },
        body: { name, price, description },
        query: { page }
    } = request

    if (request.method === "POST") {
        const stream = await client.stream.create({
            data: {
                name, price, description,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        });

        response.json({
            ok:true,
            stream
        })
    } else if (request.method === "GET") {
        const streamCount = await client.stream.count();
        const streams = await client.stream.findMany({
            take: 10,
            skip: (Number(page) - 1) * 10
        });

        response.json({
            ok: true,
            streams,
            pages: Math.ceil(streamCount / 10)
        });
    }
}

export default withApiSession(withHandler({
    method: ["GET", "POST"],
    fn: handler,
}));