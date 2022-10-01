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
    } = request;

    const reviews = await client.review.findMany({
        where: {
            createdForId: user?.id
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    avator: true
                }
            }
        }
    });

    response.json({
        ok: true,
        reviews
    })
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));