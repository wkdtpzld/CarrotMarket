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
        body: { message },
        session: { user }
    } = request;

    const newMessage = await client.message.create({
        data: {
            user: {
                connect: {
                    id: user?.id
                }
            },
            message,
            stream: {
                connect: {
                    id: Number(id)
                }
            }
        }

    })

    response.json({
        ok: true,
        messages: newMessage
    })
}

export default withApiSession(withHandler({
    method: ["POST"],
    fn: handler,
}));