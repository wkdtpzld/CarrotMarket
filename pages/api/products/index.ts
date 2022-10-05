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
            body: {
                name,
                price,
                description,
                photoId
            },
            session: {
                user
            },
        } = request
    
        const product = await client.product.create({
            data: {
                name,
                price: +price,
                description,
                image: photoId,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        });
    
        response.json({
            ok: true,
            product,
        })
    } else if (request.method === "GET") {

        const {
            query: {page}
        } = request

        const productCount = await client.product.count();
        const products = await client.product.findMany({
            include: {
                records: {
                    where: {
                        kind: 'Fav'
                    },
                    select: {
                        id: true
                    }
                },
                _count: {
                    select: {
                        records: {
                            where: {
                                kind: 'Fav'
                            }
                        },
                        chatRoom: true
                    },
                }
            },
            take: 10,
            skip: (Number(page) -1) * 10
        });

        response.json({
            ok: true,
            products,
            pages: Math.ceil(productCount / 10)
        })
    }
}

export default withApiSession(withHandler({
    method: ["GET" ,"POST"],
    fn: handler,
}));