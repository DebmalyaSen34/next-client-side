import { withSession, sessionOptions } from "@/lib/session";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

// export const GET = withSession(async function handler(request) {
//     try {
//         await connectToDatabase();

//         const session = await getIronSession(cookies(), sessionOptions);
//         const userId = session.user?.id;
//         console.log(userId);

//         if (!userId) {
//             return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//         }
//         const user = await User.findById(userId);

//         if (!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         const userData = {
//             fullName: user.fullName,
//             username: user.username,
//             mobilePhone: user.mobileNumber,
//             email: user.email
//         };

//         return NextResponse.json(userData, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching user data:", error);
//         return NextResponse.json({ message: 'An error occurred while fetching user data' }, { status: 500 });
//     }
// })

export async function GET(request) {
    try {
        await connectToDatabase();

        const token = cookies().get('token')?.value;
        console.log(token);
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = verifyToken(token);
        console.log(decodedToken);
        if (!decodedToken) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = decodedToken.id;

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const userData = {
            fullName: user.fullName,
            username: user.username,
            mobileNumber: user.mobileNumber,
            email: user.email
        };

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ message: 'An error occurred while fetching user data' }, { status: 500 });
    }
}