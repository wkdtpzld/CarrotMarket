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
            session: { user },
            query: { id },
            body: { message }
        } = request
    
        const newMessage = await client.message.create({
            data: {
                message,
                user: {
                    connect: {
                        id: user?.id
                    }
                },
                chatRoom: {
                    connect: {
                        id: Number(id)
                    }
                }
            }
        });

        response.json({
            ok: true,
            message: newMessage
        });
    }
}

export default withApiSession(withHandler({
    method: ["POST"],
    fn: handler,
}));