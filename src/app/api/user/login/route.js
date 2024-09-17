import { withSession, sessionOptions } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const POST = withSession(async function handler(request) {
    try {
        const { email, password } = await request.json();
        await connectToDatabase();

        const user = await User.findOne({ email: email });

        if (user && await bcrypt.compare(password, user.password)) {
            const session = await getIronSession(cookies(), sessionOptions);
            session.user = { id: user._id, username: user.username };
            await session.save();

            return NextResponse.json({ message: "Logged in successfully!" }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
    }
});