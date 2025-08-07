import { Router } from "express";
import { userModel } from '../models/user.model.js'

const router = Router()



// GET
router.get("/", async (req, res) => {
    try {
        const users = await userModel.find()
        console.log(users);
        res.send({ status: "Success", payload: users })
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
    }
})


// POST
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, age } = req.body

        //todo: Validar la informacion que me llega - Para evitar inyeccion SQL

        const result = await userModel.create({ first_name, last_name, email, age })

        res.status(201).send({ status: "Success", payload: result })
    } catch (error) {
        console.error("No se pudo crear el usuario con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear el usuario con moongose", message: error });
    }
})

// PUT
router.put('/:id', async (req, res) => {
    try {
        const userUpdate = req.body

        // todo - fatan validaciones

        //usamos userModel para hacer la actulizacion
        const result = await userModel.updateOne({ _id: req.params.id }, userUpdate)

        res.status(202).send({ status: "Success", payload: result })

    } catch (error) {
        console.error("No se pudo actualizar el usuario con moongose: " + error);
        res.status(500).send({ error: "No se pudo actualizar el usuario con moongose", message: error });
    }
})



// DELETE
router.delete('/:id', async (req, res) => {
    try {
        //usamos userModel para hacer la eliminacion
        const result = await userModel.deleteOne({ _id: req.params.id })

        res.send({ status: "Success", payload: result })
    } catch (error) {
        console.error("No se pudo eliminar el usuario con moongose: " + error);
        res.status(500).send({ error: "No se pudo eliminar el usuario con moongose", message: error });
    }
})







export default router