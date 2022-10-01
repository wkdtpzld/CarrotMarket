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
            id: Number(id)
        },
        select: {
            id: true
        }
    });

    if (!product) {
        response.status(404).end();
    }

    const alreadyExists = await client.record.findFirst({
        where: {
            productId: Number(id),
            userId: user?.id,
            kind: 'Fav'
        }
    });

    if (alreadyExists) {
        await client.record.delete({
            where: {
                id: alreadyExists.id
            }
        })
    } else {
        await client.record.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    }
                },
                product: {
                    connect: {
                        id: Number(id)
                    }
                },
                kind: "Fav"
            }
        })
    }

    return response.json({
        ok: true
    })
    
}

export default withApiSession(withHandler({
    method: ["POST"],
    fn: handler,
}));