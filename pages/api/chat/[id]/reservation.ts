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
            body: { date, productId }
        } = request
        
        const isAlreadyExist = await client.reservation.findFirst({
            where: {
                productId
            },
            select: {
                id: true
            }
        });

        if (isAlreadyExist) {
            await client.reservation.delete({
                where: {
                    id: isAlreadyExist.id
                }
            })
            response.json({
                ok: true,
            })

        } else {
            const reservation = await client.reservation.create({
                data: {
                    chatRoom: {
                        connect: {
                            id: Number(id)
                        }
                    },
                    product: {
                        connect: {
                            id: productId
                        }
                    },
                    reservationDate: date
                }
            });
    
            response.json({
                ok: true,
                reservation
            })
        }


    } 
}

export default withApiSession(withHandler({
    method: ["POST", "DELETE"],
    fn: handler,
}));