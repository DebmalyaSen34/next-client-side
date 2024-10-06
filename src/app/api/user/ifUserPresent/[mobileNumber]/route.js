import User from "@/models/userModel";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

/**
 * GET /api/user/ifUserPresent/[mobileNumber]
 * 
 * Fetches a user by their mobile number.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Object} param1 - The route paramters.
 * @param {string} params.mobileNumber - The mobile number to search for.
 * @returns {Response} - The response object containing the user data or error message.
 */

export async function GET(request, {params}) {
    try{
        const {mobileNumber} = params;

        if(mobileNumber.length>10){
            return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
        }

        if(!mobileNumber || !/^\d+$/.test(mobileNumber)){
            return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ mobileNumber: mobileNumber });

        if(!user){
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: "User is found!"}, {status: 200});
    }catch(error){
        console.error("Error fetching user by mobile number: ", error);
        return NextResponse.json({ error: 'An error occurred while fetching user by mobile number' }, {status: 500});
    }
}