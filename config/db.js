import mongoose from "mongoose";


const connectToDB = async () => {
    if (mongoose.connections[0].readyState) {
            return true;
    } else {
        await mongoose.connect(process.env.MONGODB_URI);
    }
};


export default connectToDB;