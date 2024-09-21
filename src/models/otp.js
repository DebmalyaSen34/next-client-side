import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: Number,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m'}
    },
});

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export default OTP;