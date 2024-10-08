import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

/**
 * PUT /api/user/getUser/updatePassword
 * 
 * Updates a user's password.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object containing the success message or error message.
 */
export async function PUT(request) {
    try {
        const { mobileNumber, newPassword } = await request.json();

        console.log(mobileNumber, newPassword);

        // Validate input
        if (!mobileNumber || !newPassword) {
            return NextResponse.error(new Error('Invalid request'));
        }

        // Validate password length
        if (newPassword.length < 8) {
            return NextResponse.error(new Error('Password must be at least 8 characters long'));
        }

        // Find the user by ID
        const user = await User.findOne({mobileNumber});
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        // Return success response
        return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error updating password: ", error);
        return NextResponse.json({ error: 'An error occurred while updating password' }, { status: 500 });
    }
}