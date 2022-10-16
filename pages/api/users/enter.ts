import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from '@libs/server/withHandler';

import twilio from "twilio";
import smtpTransport from '../../../libs/server/email';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
    request: NextApiRequest,
    response: NextApiResponse<ResponseType>
) {
  const { phone, email } = request.body;
  const user = phone ? { phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  if (!user)
    return response.json({
      ok: false,
    });

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: "+82" + phone,
      body: `Your login token is ${payload}`,
    });
  } else if (email) {
    const mailOption = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Carrot Market OTP Email",
      text: `Your OTP Code: ${payload} `,
    };
    await smtpTransport.sendMail(mailOption);
    smtpTransport.close();
  }

  return response.json({
    ok: true,
  });
}


export default withHandler({
  method: ["POST"],
  fn: handler,
  isPrivate: false,
});