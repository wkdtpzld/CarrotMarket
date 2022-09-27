import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';



async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const { phone, email } = request.body;

    const user = phone ? { phone: +phone } : { email }
    const payload = Math.floor(100000 + Math.random() * 900000) + "";

    if (!user) return response.json({
        ok: false
    })

    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user
                    },
                    create: {
                        name: "Anonymous",
                        ...user
                    },
                }
            }
        }
    })
    console.log(token);
    

    return response.status(200).end({
        ok: true,

    });
}


export default withHandler("POST", handler);