import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';



async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
    const res = await (await fetch(`https://customer-${process.env.CF_CUSTOM_ID}.cloudflarestream.com/6b6972f427f51793099c6b427783398e/lifecycle`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`
            }
        }
    )).json();


    response.json({
        ok: true,
        ...res.result
    })
}

export default withApiSession(withHandler({
    method: ["GET"],
    fn: handler,
}));