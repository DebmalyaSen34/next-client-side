import { NextResponse } from "next/server";
import otpGenerator from 'otp-generator';
import OTP from "@/models/otp";
import connectToDatabase from "@/lib/mongodb";

/**
 * Handles the POST request to send an OTP to a mobile number.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object with the result of the OTP sending operation.
 */
export async function POST(request) {
    // Extract the mobile number from the request body
    const { mobileNumber } = await request.json();
    
    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        digits: true,
        specialChars: false,
    });

    // Fast2SMS API key and URL from environment variables
    const api_key = process.env.FAST2SMS_API_KEY;
    const api_url = process.env.FAST2SMS_API_URL;

    // Headers for the Fast2SMS API request
    const headers = {
        "authorization": api_key,
        "Content-Type": "application/json"
    };

    // Body for the Fast2SMS API request
    const body = JSON.stringify({
        authorization: api_key,
        route: "otp",
        sender_id: "TXTIND",  // Sender ID, can be customized from Fast2SMS dashboard
        variables_values: otp, // The OTP to be sent
        language: "english",
        numbers: mobileNumber // The phone number where the OTP should be sent
    });

    try {
        // Send the OTP using the Fast2SMS API
        const response = await fetch(api_url, {
            method: "POST",
            headers,
            body
        });

        console.log("Raw response: ", response);

        // Parse the response from the Fast2SMS API
        const data = await response.json();

        console.log("Parsed response data: ", data);

        // Check if the OTP was sent successfully
        if (response.ok) {
            console.log('OTP sent successfully:', data);

            await connectToDatabase();
            
            const timestamp = new Date().getTime();
            await OTP.create({
                mobileNumber: mobileNumber,
                otp: otp,
                timestamp: timestamp,
            });

            return NextResponse.json({ message: 'OTP sent successfully', data });
        } else {
            console.error('Failed to send OTP:', data);
            return NextResponse.json({ error: 'Failed to send OTP', data }, { status: 500 });
        }
    } catch (error) {
        // Handle any errors that occurred during the OTP sending process
        console.error('Error sending OTP:', error);
        return NextResponse.json({ error: 'Error sending OTP' }, { status: 500 });
    }
}