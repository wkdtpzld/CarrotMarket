import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

declare module "iron-session" {

    interface IronSessionData {
        user?: {
            id: number
        }
    }
}

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    // 입력 토큰값
    const { token } = request.body;

    // Prisma findUnique token DB
    const foundToken = await client.token.findUnique({
        where: {
            payload: token
        }
    });

    if (!foundToken) return response.status(404).end();

    // Session 값 정의 && 저장
    request.session.user = {
        id: foundToken.userId
    };
    await request.session.save();

    // Prisma token DB Delete
    await client.token.deleteMany({
        where: {
            userId: foundToken.userId
        }
    });

    // Result
    response.json({
        ok: true
    });

}

export default withApiSession(withHandler("POST", handler));