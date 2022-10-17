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
    session: { user },
  } = request;

  const target = await client.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (target?.userId !== user?.id) {
    return response.json({
      ok: false,
    });
  }

  return response.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    fn: handler,
  })
);