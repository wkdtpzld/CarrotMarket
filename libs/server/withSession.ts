import { withIronSessionApiRoute } from "iron-session/next"

const cookieOptions = {
    cookieName: "carrotSession",
    password: process.env.SESSION_PASSWORD!
}

export function withApiSession(fn:any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}