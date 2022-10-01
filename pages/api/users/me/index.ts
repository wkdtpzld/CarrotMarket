import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';

import withHandler from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) { 
    if (request.method === "GET") {
        const user = await client.user.findUnique({
            where: {
                id: request.session.user?.id
            }
        });
        response.json({
            ok: true,
            profile: user
        })
    } else if (request.method === "POST") {
        const { 
            session: { user },
            body: { email, phone, name }
        } = request;

        const currentUser = await client.user.findUnique({
            where: {
                id: user?.id
            }
        })

        if (email && email !== currentUser?.email) {
            const alreadyExists = Boolean(await client.user.findUnique({
                where: {
                    email
                },
                select: {
                    id: true
                }
            }));

            if (alreadyExists) {
                return response.json({
                    ok: false,
                    error: "사용중인 이메일입니다."
                });
            };

            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    email
                }
            });
        }

        if (phone && phone !== currentUser?.phone) {
            const alreadyExists = Boolean(await client.user.findUnique({
                where: {
                    phone
                },
                select: {
                    id: true
                }
            }));

            if (alreadyExists) {
                return response.json({
                    ok: false,
                    error: "사용중인 휴대폰 번호 입니다."
                });
            };

            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    phone
                }
            });
        }

        if (name) {
            await client.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    name
                }
            })
        }

        response.json({
            ok: true
        })
    }
    
}

export default withApiSession(withHandler({
    method: ["GET", 'POST'],
    fn: handler,
}));