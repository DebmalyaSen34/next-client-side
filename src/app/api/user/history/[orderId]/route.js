import { NextResponse } from "next/server";
import Order from "@/models/order";
import connectToDatabase from "@/lib/mongodb";

/**
 * GET handler for fetching order details by order ID.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Object} context - The context object containing route parameters.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.orderId - The ID of the order to fetch.
 * 
 * @returns {Promise<NextResponse>} - The response containing order details or an error message.
 */

export async function GET(request, {params}){
    try {
        const {orderId} = params;
        
        if(!orderId){
            return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
        }
        
        await connectToDatabase();

        const orderDetails = await Order.findById(orderId).populate({
            path:'restaurantId',
            select: 'restaurantName'
        });
        
        if(!orderDetails){
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        
        return NextResponse.json(orderDetails);

    } catch (error) {
        console.error('There was an error fetching order details:', error);
        return NextResponse.json({ error: 'An error occurred while fetching order details' }, { status: 500 });
    }
}