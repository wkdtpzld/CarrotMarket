import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';

import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const user = await client.user.findUnique({
        where: {
            id: request.session.user?.id
        }
    });

    response.json({
        ok: true,
        profile: user
    })
}

export default withApiSession(withHandler({
    method: "GET",
    fn: handler,
}));