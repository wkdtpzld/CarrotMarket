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
        session: { user },
        body: { sellerId, productId },
    } = request
    

    if (sellerId === user?.id) {
        return response.status(403).json({
            ok: false,
            error: "Not Accept"
        })
    }
    
    const alreadyExist = await client.chatRoom.findFirst({
        where: {
            seller: {
                id: sellerId
            },
            buyer: {
                id: user?.id
            },
            product: {
                id: productId
            }
        }
    })

    if (alreadyExist) return response.json({
        ok: false,
        error: "Duplication",
        chatRoom: alreadyExist
    })

    const chatRoom = await client.chatRoom.create({
        data: {
            seller: {
                connect: {
                    id: sellerId
                }
            },
            buyer: {
                connect: {
                    id: user?.id
                }
            },
            product: {
                connect: {
                    id: productId
                }
            }
        }
    });

    response.json({
        ok: true,
        chatRoom
    })

}

export default withApiSession(withHandler({
    method: ["POST"],
    fn: handler,
}));