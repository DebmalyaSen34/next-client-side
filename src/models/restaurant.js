import mongoose from "mongoose";

export const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: [true, "Restaurant name is required"]
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "You must register with an email"]
    },
    cuisineType: {
        type: Array,
        required: [true, "Cuisine type is required"]
    },
    priceRange: {
        type: String,
        required: [true, "Price range is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: 1,
        max: 5
    }
});

restaurantSchema.pre("save", function (next) {
    if (this.address) {
        const addressParts = this.address.split(", ").map(part => part.trim());
        this.city = addressParts[1] || '';
        this.state = addressParts[2] || '';
        this.zipcode = addressParts[3] || '';
    }
    next();
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;