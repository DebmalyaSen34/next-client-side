import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Restaurant from "@/models/restaurant";
import Product from "@/models/poduct";


/**
 * GET /api/vendor/restaurant
 * 
 * Fetches restaurant data. If a restaurantId query parameter is provided, it fetches details of the specific restaurant.
 * Otherwise, it returns a list of all restaurants.
 * 
 * Query Parameters:
 * - restaurantId (optional): The ID of the restaurant to fetch details for.
 * 
 * Responses:
 * - 200: Returns the details of the specified restaurant or a list of all restaurants.
 * - 400: Invalid restaurantId provided.
 * - 404: Restaurant not found.
 * - 500: Internal server error.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {Response} - The response object containing the restaurant data or an error message.
 */

export async function GET(request){
    // Parse the request URL to extract query parameters
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurantId');

    
    try {
        // conenct to the database
        await connectToDatabase();
        if(restaurantId){
            // Fetch details of specific restaurant
            try {
                const restaurant = await Restaurant.findById(restaurantId);
                if (!restaurant) {
                    // Return 404 if the restaurant is not found
                    return NextResponse.json({ error: 'Restaurant not found!' }, { status: 404 });
                }
                const menuItems = await Product.find({ _id: { $in: restaurant._doc.menu } });
                // Return the restaurant details
                return NextResponse.json({ ... restaurant, menu: menuItems});
            } catch (error) {
                // Return 400 if the restaurantId is invalid
                return NextResponse.json({ error: 'Invalid Restaurant ID!' }, {status: 400});
            }
        }else{
            // Fetch details of all restaurants
            const allRestaurants = await Restaurant.find({});
            return NextResponse.json(allRestaurants);
        }
    } catch (error) {
        // Log the error and return 500 if an error occurs
        console.error("Failed to fetch details of restaurants", error);
        return NextResponse.json({ error: 'Internal Server Error!' }, {status: 500});
    }
}