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
        query: { id },
        session: { user }
    } = request;

    if (request.method === "GET") {
        const stream = await client.stream.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                messages: {
                    select: {
                        message: true,
                        user: {
                            select: {
                                id: true,
                                avator: true
                            }
                        }
                    }
                }
            },
            
        });
    
        const isOwner = stream?.userId === user?.id;
        if (stream && !isOwner) {
            stream.cloudflareKey = "xxxxx";
            stream.cloudflareUrl = "xxxxx";
        }
        
        response.json({
            ok: true,
            stream
        })
    } else if (request.method === "POST") {

        if (user?.id !== Number(id)) {
            response.status(403).json({
                ok: false
            })
        }

        await client.stream.delete({
            where: {
                id: Number(id)
            }
        });

        response.json({
            ok: true
        });
    }
}

export default withApiSession(withHandler({
    method: ["GET","POST"],
    fn: handler,
}));