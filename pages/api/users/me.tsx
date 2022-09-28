import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';

import { withIronSessionApiRoute } from "iron-session/next"
import withHandler from '../../../libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    console.log(request.session.user);
    
}

export default withApiSession(withHandler("GET", handler));