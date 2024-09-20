import { NextResponse } from "next/server";
import { withSession } from "@/lib/session";

export default withSession(async function middleware(req) {
    console.log("Middleware executed");
    const user = req.session.get('user');
    console.log("User in the session: ", user);

    if (!user && !req.nextUrl.pathname.startsWith('/login')) {
        console.log("User not authenticated, redirecting to login");
        return NextResponse.redirect(new URL('/login', req.url));
    }

    console.log("User authenticated, proceeding to next handler");
    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};