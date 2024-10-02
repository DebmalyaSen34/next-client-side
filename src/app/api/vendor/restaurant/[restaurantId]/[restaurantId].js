import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Restaurant from "@/models/restaurant";

export async function GET(request, {params}){

    console.log(params);
    const restaurantId = params.restaurantId;

    // console.log(restaurantId);
    
    await connectToDatabase();

    const restaurant = await Restaurant.findById(restaurantId);
    console.log(restaurant);


    if (!restaurant) {
        return NextResponse.json({ error: 'Restaurant not found!' }, { status: 404 });
    }

    return NextResponse.json(restaurant);
}