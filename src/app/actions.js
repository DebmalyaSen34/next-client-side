"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import { revalidatePath } from "next/cache";

export async function setAuthCookie(token) {
    cookies().set("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    redirect('/home');
}

export async function getUserIdFromCookie() {
    const token = cookies().get("authToken")?.value;

    if (!token) {
        console.log('No token found');
        return null;
    }

    console.log('Token: ', token);

    try {
        const decodedToken = await verifyToken(token);

        console.log('Decoded Token: ', decodedToken);


        if (!decodedToken) {
            console.log('Token verification failed');
            return null;
        }

        if (!decodedToken.id) {
            console.log('No user ID found in the token');
            return null;
        }

        return decodedToken.id;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }

}

export async function removeAuthCookie() {
    try {
        cookies().remove("authToken", {
            path: '/'
        });
        return true;
    } catch (error) {
        console.error('Failed to remove auth cookie:', error);
        return false;
    }

}

export async function confirmOrder(items, orderId, qr) {
    revalidatePath(`/cart/orderSuccessful/${orderId}`);
    return { items: items, orderId: orderId, qr: qr };
}