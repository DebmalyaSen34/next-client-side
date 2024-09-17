import { NextResponse } from "next/server";
import { withSession } from "@/lib/session";

export default withSession(async function middleware(req) {
    const user = req.session.get('user');
  
    if (!user && !req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  
    return NextResponse.next();
  });
  
  export const config = {
    matcher: [
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  };