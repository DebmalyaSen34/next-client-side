import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Restaurant from "@/models/restaurant";

export async function GET(){
    await connectToDatabase();
    
    try {
        const restaurant = await Restaurant.find({});
        return NextResponse.json(restaurant);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch restaurants from database!' }, {status: 500});
    }
}