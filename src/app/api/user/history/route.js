import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/userModel";
import Order from "@/models/order";
import connectToDatabase from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

export async function GET(request){
    try {
        await connectToDatabase();

        const token = cookies().get('token')?.value;

        if(!token){
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = verifyToken(token);

        if(!decodedToken){
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = decodedToken.id;

        const allOrders = await Order.find({customerId: userId});

        console.log('Orders: ', allOrders);

        return NextResponse.json(allOrders, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'An error occurred while fetching user data' }, { status: 500 });        
    }
}