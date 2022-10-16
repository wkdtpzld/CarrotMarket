import { NextRequest, NextFetchEvent, NextResponse } from "next/server"

export function middleware(req:NextRequest, ev:NextFetchEvent, res:NextResponse) {
  const carrotSession = req.cookies.get('carrotSession');

  if (!req.nextUrl.pathname.startsWith("/api")) {
    if (!req.nextUrl.pathname.startsWith('/enter') && !carrotSession) {
      req.nextUrl.pathname="/enter"
      return NextResponse.redirect(req.nextUrl);
    } else if (req.nextUrl.pathname.startsWith('/enter') && carrotSession) {
      req.nextUrl.pathname="/"
      return NextResponse.redirect(req.nextUrl);
    }
  }
}

export const config = {
  matcher: ["/:path", "/community/:path", "/profile/:path", "/chats/:path", "/stream/:path", "/enter"],
};