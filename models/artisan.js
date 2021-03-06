import mongoose from 'mongoose';

const artisanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_website: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    current_rating: {
        type: Number,
        default: 0
    },
    rating: [{
        customer: {
            type: String,
            required: true
        },
        star: Number
    }],
    customer_reviews: {
        type: [String],
        default: []
    },
}, { timestamps: true });

export default mongoose.model("Artisan", artisanSchema);
