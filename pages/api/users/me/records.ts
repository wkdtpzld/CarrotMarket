import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';

import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const {
        session: { user },
        query: { kind, page }
    } = request;

    
    const records = await client.record.findMany({
        where: {
            userId: user?.id,
            //@ts-ignore
            kind
        },
        include: {
            product: {
                include: {
                    _count: {
                        select: {
                            records: {
                                where: {
                                    //@ts-ignore
                                    kind
                                }
                            },
                            chatRoom: true
                        }
                    }
                }
            },
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10,
        skip: (Number(page) - 1) * 10
        
    });

    response.json({
        ok: true,
        records
    })
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));