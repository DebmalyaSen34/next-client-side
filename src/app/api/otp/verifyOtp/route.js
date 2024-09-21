import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import OTP from "@/models/otp";

export async function POST(request){
    try{
        const { searchParams } = new URL(request.url);
        const mobileNumber = parseInt(searchParams.get('mobileNumber'));
        const { otp} = await request.json();
        await connectToDatabase();

        const otpRecord = await OTP.findOne({ mobileNumber: mobileNumber });
        console.log('OTP Record: ', otpRecord);
        if(!otpRecord){
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
        }
        const currentTimestamp = new Date().getTime();
        const otpAge = (currentTimestamp - otpRecord.timestamp) / 1000/60;
        console.log(otpAge);
        if(otpAge > 5){
            return NextResponse.json({ error: 'OTP expired' }, { status: 401 });
        }

        if(otpRecord.otp !== otp){
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
        }

        return NextResponse.json({ message: 'OTP verified successfully' }, {status: 200});
    }catch(error){
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}