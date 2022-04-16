import mongoose from 'mongoose';

const subscriberSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

export default mongoose.model("Subscriber", subscriberSchema);
