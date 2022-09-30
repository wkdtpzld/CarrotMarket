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
    const alreadyExists = await client.fav.findFirst({
        where: {
            productId: Number(id),
            userId: user?.id
        }
    });

    if (alreadyExists) {
        await client.fav.delete({
            where: {
                id: alreadyExists.id
            }
        })
    } else {
        await client.fav.create({
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
                }
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