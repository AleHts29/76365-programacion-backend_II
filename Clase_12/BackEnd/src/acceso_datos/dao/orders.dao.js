import orderModel from '../models/orders.model.js'


export default class OrderService {

    getAll = async () => {
        const orders = await orderModel.find()
        return
    }

    save = async (order) => {
        const result = await orderModel.create(order)
        return result
    }


    getById = async (id) => {
        const result = await orderModel.findOne(id)
        return result
    }
}