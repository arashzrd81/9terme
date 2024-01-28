import mongoose from "mongoose";


const schema = mongoose.Schema({
    userIP: {
        type: String,
        required: true,
    },
    usedCalculatorCount: {
        type: Number,
        required: true,
    }
});

const model = mongoose.models.User || mongoose.model("User", schema);


export default model;