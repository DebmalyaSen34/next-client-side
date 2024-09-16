import { NextResponse } from "next/server";
import User from "@/models/userModel";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
    try{

        
        await clientPromise();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        console.log(username);
        


        const user = await User.findOne({username: username});

        if(!user){
            return NextResponse.json({message: "User not found!"}, {status: 404});
        }

        return NextResponse.json({ message: "User created successfully!" }, {user: user});

    }catch(error){
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}