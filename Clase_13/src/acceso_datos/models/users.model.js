import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    role: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orders' }],
})


const userModel = mongoose.model('users', userSchema);
export default userModel;