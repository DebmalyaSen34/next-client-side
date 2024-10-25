import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import User from "@/models/userModel";
import { generateToken } from "@/lib/jwt";
import { supbase } from "@/lib/supabase";
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
            return NextResponse.json({ error: "user with this mobile number already exists!"}, {status: 409});
        }

        const existUserName = await User.findOne({username: username});

        if(existUserName){
            return NextResponse.json({ error: "username already exists!"}, {status: 409});
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

        const { data, error} = await supbase
        .from('users')
        .insert([
            {
                userName: username,
                email: email,
                password: hashedPassword,
                fullName: fullName,
                mobileNumber: mobileNumber
            }
        ]);

        if(error){
            console.error("Error saving user to Supabase: ", error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }

        return NextResponse.json({ message: "User saved successfully!"});
    }catch(error){
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}