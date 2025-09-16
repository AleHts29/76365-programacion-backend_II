import userModel from '../models/users.model.js'

export default class UserService {

    getAll = async () => {
        const users = await userModel.find()
        return users
    }


    save = async (user) => {
        const result = await userModel.create(user)
        return result
    }

    getById = async (id) => {
        const result = await userModel.findOne(id)
        return result
    }
}