import { NextResponse } from "next/server";
import QRcode from 'qrcode';
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/order";

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const orderId = searchParams.get('orderId');

        console.log('Order ID: ', orderId);

        if(!orderId){
            return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
        }

        const qrCodeDataURL = await QRcode.toDataURL(orderId);

        if(!qrCodeDataURL){
            return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
        }

        console.log('qrcode: ', qrCodeDataURL);


        await connectToDatabase();

        const order = await Order.findByIdAndUpdate(orderId, {
            qrcode: qrCodeDataURL
        }, {new: true});

        console.log(order);


        return NextResponse.json({ message: 'QR code successfully generate!'}, {status: 200});
    } catch (error) {
        console.error('Error generating QR code:', error);
        return NextResponse.json({ error: 'An error occurred while generating QR code' }, { status: 500 });
    }
}