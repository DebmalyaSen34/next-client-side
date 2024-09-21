import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function authMiddleware(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.redirect('/login');
    }

    try {
        const decoded = verifyToken(token);
        request.user = decoded;
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect('/login');
    }
}