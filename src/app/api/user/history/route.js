export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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

        const allOrders = await Order.find({customerId: userId}).populate('restaurantId');

        const ordersWithDetails = allOrders.map(order => {
            return{
                ...order.toObject(),
                restaurantName: order.restaurantId.restaurantName,
                orderId: order._id.toString().slice(0, 6)
        };
        });

        console.log('Orders with details: ', ordersWithDetails);

        return NextResponse.json(ordersWithDetails, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'An error occurred while fetching user data' }, { status: 500 });        
    }
}