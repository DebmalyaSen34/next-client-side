import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import User from "@/models/userModel";
import { generateToken } from "@/lib/jwt";
/**
 * Handles POST requests to register a new user.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - The response object.
 */
export async function POST(request) {
    try{
        const {
            fullName,
            email, 
            password,
            mobileNumber,
            username
        } = await request.json();

        
        await clientPromise();

        const existingUser = await User.findOne({username: username});
        if(existingUser){
            return NextResponse.json({ error: "user already exists!"});
        }

        console.log("Here it is: ", existingUser);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            fullName: fullName,
            mobileNumber: mobileNumber
        });

        await newUser.save();

        const token = generateToken({ id: newUser._id, username: newUser.username });

        // Set the token in the cookies
        const response = NextResponse.json({ message: "User created successfully!" });
        response.cookies.set('token', token, { httpOnly: false, secure: process.env.NODE_ENV === 'production' });

        // Redirect to /home
        response.headers.set('Location', '/home');
        response.status = 302;

        return response;
    }catch(error){
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}