import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    dishName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;