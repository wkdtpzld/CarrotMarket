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
        query: { id },
        session: { user }
    } = request;
    
    const product = await client.product.findUnique({
        where: {
            id: Number(id),
            
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    const terms = product?.name.split(" ").map(word => ({
        name: {
            contains: word
        }
    }));

    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id
                }
            }
        }
    });

    const isLiked = Boolean(await client.record.findFirst({
        where: {
            kind: 'Fav',
            productId: product?.id,
            userId: user?.id
        },
        select: {
            id: true
        }
    }));

    response.json({
        ok: true,
        product,
        relatedProducts,
        isLiked
    })
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));