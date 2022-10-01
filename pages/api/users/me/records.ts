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
        query: { kind }
    } = request;

    if (kind !== "Fav" || "Purchase" || "Sale") return;

    const records = await client.record.findMany({
        where: {
            userId: user?.id,
            kind
        },
        include: {
            product: {
                include: {
                    _count: {
                        select: {
                            records: {
                                where: {
                                    kind
                                }
                            }
                        }
                    }
                }
            },
        },
        
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