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

        const existingUser = await User.findOne({mobileNumber: mobileNumber});
        if(existingUser){
            return NextResponse.json({ error: "user already exists!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            fullName: fullName,
            mobileNumber: mobileNumber
        });

        console.log('New User: ', newUser);

        await newUser.save();

        return NextResponse.json({ message: "User saved successfully!"});
    }catch(error){
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}