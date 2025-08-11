import { Router } from "express";
import { userModel } from '../models/user.model.js'


const router = Router();



//Login
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    console.log("Registrando newUser: ", req.body);


    // 01 - Verifico si el user ya existe en la DB
    const exist = await userModel.findOne({ email })
    if (exist) {
        return res.status(400).send({ status: "error", message: "Usuario ya existe." })
    }

    // Construimos un DTO 
    const userDTO = {
        first_name,
        last_name,
        email,
        age,
        password // <--- se encrypta
    }

    // 02 - doy de alta a newUser
    const result = await userModel.create(userDTO)

    // 03 - responder al cliente
    res.send({ status: "Success", payload: `UYsuario creado con exito - ID: ${result.id}` })

})


//Register
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password })


    if (!user) return res.status(401).send({ status: "error", error: "Credenciales incorrectas" })

    // Levanto session
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }


    res.send({ status: "Success", payload: req.session.user, message: "Primer logueo realizado!!.." })
})


export default router;