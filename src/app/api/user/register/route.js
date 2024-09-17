import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import User from "@/models/userModel";
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

        return NextResponse.json({ message: "User created successfully!" });
    }catch(error){
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}