import { withSession, sessionOptions } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";

export async function POST(request) {
    try {
        const { mobileNumber, password } = await request.json();
        await connectToDatabase();

        const user = await User.findOne({ mobileNumber });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken({ id: user._id, username: user.username });
            const response = NextResponse.json({ message: 'Logged in successfully!' });
            response.cookies.set('token', token, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });
            return response;
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
    }
}