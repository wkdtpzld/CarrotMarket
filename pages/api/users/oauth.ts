import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from "@libs/server/withSession";

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
  const {
    body: { email, name, photo }
  } = request

  const isAlreadyAccount = (await client.user.findFirst({
    where: {
      email
    },
    select: {
      id: true
    }
  }));

  if (isAlreadyAccount) {
    request.session.user = {
      id: isAlreadyAccount.id
    };
    await request.session.save();

    return response.json({
      ok: true
    });
  };

  const user = await client.user.create({
    data: {
      name,
      avator: photo,
      email,
      loginType: 'oAuth'
    }
  });

  request.session.user = {
    id: user.id
  };

  await request.session.save();

  response.json({
    ok: true,
    user
  });
}


export default withApiSession(withHandler({
  method: ['POST'],
  fn: handler,
  isPrivate: false,
}));