import businessModel from "../models/business.model.js";


export default class BusinessService {
    getAll = async () => {
        const business = await businessModel.find()
        return business
    }

    getById = async (id) => {
        const result = await businessModel.findById(id)
        return result
    }

    save = async (business) => {
        const result = await businessModel.create(business)
        return result
    }

    getBusinessesByCategory = async (category) => {
        const result = await businessModel.find({ category: category })
        return result
    }
}