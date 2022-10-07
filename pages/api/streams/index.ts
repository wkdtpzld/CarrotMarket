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

        const {
            result: {
                uid,
                rtmps: { streamKey, url },
                },
            } = await (
                await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
                {
                    method: "POST",
                    headers: {
                    Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
                    },
                    body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
                }
                )
            ).json();
        


        const stream = await client.stream.create({
            data: {
                name,
                price: +price,
                description,
                cloudflareId: uid,
                cloudflareKey: streamKey,
                cloudflareUrl: url,
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