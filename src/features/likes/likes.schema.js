import mongoose from "mongoose"
export const likeSchema = new mongoose.Schema({
    users: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Types"
    },
    Types: {
        type : String,
        enum: ["products","category"]
    }
})