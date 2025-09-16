import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    number: Number,
    business: [{ type: mongoose.Schema.Types.ObjectId, ref: 'businesses' }],
    products: [],
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    totalPrice: Number,
})


const orderModel = mongoose.model('orders', orderSchema);
export default orderModel;