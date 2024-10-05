import Order from "@/models/order";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import { verifyToken } from "@/lib/jwt";

export async function POST(request) {
    try {

        await connectToDatabase();

        const body = await request.json();
        const {cart, orderType} = body;
        
        if(!cart){
            return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
        }

        console.log('Cart: ', cart);
        console.log('Order Type: ', orderType);

        const items = Object.values(cart);

        const restaurantId = items[0]?.restaurantId;

        console.log('RestaurantId: ', restaurantId);
        console.log('items: ', items);

        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decodedToken = verifyToken(token);

        if (!decodedToken) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = decodedToken.id;
        console.log('UserId: ', userId);


        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let totalAmount = 0;
        const orderItems = items.map(item => {
            totalAmount += item.price * item.quantity;
            return {
                productId: item._id,
                quantity: item.quantity,
                dishName: item.dishName,
                price: item.price,
                imageUrl: item.imageUrl
            };
        });

        console.log('Items: ', orderItems);

        const order = new Order({
            customerId: userId,
            restaurantId: restaurantId,
            items: orderItems,
            totalAmount: totalAmount,
            orderType: orderType,
            arrivalTime: new Date(Date.now() + 60 * 60 * 1000) // 10 minutes from now
        });

        await order.save();

        return NextResponse.json({ message: "Order sent successfully", order }, { status: 201 });

    } catch (error) {
        console.error('Error sending order:', error);
        return NextResponse.json({ error: 'An error occurred while sending order' }, { status: 500 });
    }

}