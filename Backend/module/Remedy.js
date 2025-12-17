import mongoose from "mongoose";

const remedySchema = new mongoose.Schema({
    symptoms: {
        type: [String],
        required: true,
    },
    remedy: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Remedy = mongoose.model("Remedy", remedySchema);
export default Remedy;