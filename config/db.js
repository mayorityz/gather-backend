import mongoose from "mongoose";

// mongodb connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connection Success 👍");
    } catch (error) {
        console.log("MongoDB Connection Failed 💥");
        process.exit(1);
    }
};

export default connectDB;
