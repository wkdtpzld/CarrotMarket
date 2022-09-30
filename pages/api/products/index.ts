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
                description
            },
            session: {
                user
            }
        } = request
    
        const product = await client.product.create({
            data: {
                name,
                price: +price,
                description,
                image: "xx",
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
        const products = await client.product.findMany({
            include: {
                _count: {
                    select: {
                        fav: true
                    }
                }
            }
        });

        response.json({
            ok: true,
            products
        })
    }
}

export default withApiSession(withHandler({
    method: ["GET" ,"POST"],
    fn: handler,
}));