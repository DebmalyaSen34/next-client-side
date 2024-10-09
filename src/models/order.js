import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'debs',
        require: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
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
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    orderType: {
        type: String,
        required: true
    }
});

const Order = mongoose.models.debOrder || mongoose.model('debOrder', orderSchema);

export default Order;