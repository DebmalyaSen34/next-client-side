import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/register', request.url));
    }

    try {
        verifyToken(token);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/register', request.url));
    }
}

export const config = {
    matcher: ['/home'],
};