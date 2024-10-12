export const dynamic = 'force-dynamic';

import connectToDatabase from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function PUT(request) {
    try {
        await connectToDatabase();

        const cookieHeader = request.headers.get('cookie');
        const cookies = new Map(cookieHeader.split(';').map(cookie => cookie.trim().split('=')));
        const token = cookies.get('token');

        if(!token){
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = verifyToken(token);

        if(!decodedToken){
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = decodedToken.id;
        const userData = await request.json();

        const user = await User.findByIdAndUpdate(userId, userData, { new: true });

        if(!user){
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User updated successfully', user}, {status: 200});
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'An error occurred while updating user' }, { status: 500 });
    }
}