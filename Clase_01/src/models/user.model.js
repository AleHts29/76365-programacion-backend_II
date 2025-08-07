import mongoose from "mongoose";

const userColection = 'usuarios'


const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Correo es requerido para el alta"]
    },
    age: Number
},
    {
        versionKey: false
    }

)


export const userModel = mongoose.model(userColection, userSchema)