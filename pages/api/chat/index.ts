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
            },
            select: {
                id: true
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
            },
            select: {
                id: true
            }
        });
    
        response.json({
            ok: true,
            chatRoom
        })
    } else if (request.method === 'GET') {
        const {
            session: { user }
        } = request

        const chatRooms = await client.chatRoom.findMany({
            where: {
                OR: [
                    { sellerId: user?.id },
                    { buyerId: user?.id}
                ]
            },
            include: {
                message: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1,
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                avator: true
                            }
                        },
                        message: true,
                    }
                },
                product: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        response.json({
            ok: true,
            chatRooms
        })

    }

}

export default withApiSession(withHandler({
    method: ["POST","GET"],
    fn: handler,
}));