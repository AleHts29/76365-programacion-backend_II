import { usersService } from '../services/services.js';

// Instancia del servicio
// const userService = new UserService()


export const getUsers = async (req, res) => {
    try {
        const users = await usersService.getAll()
        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios." });
    }
}

export const getUserById = async (req, res) => {
    res.send({ message: "No implementado", payload: "getUserById en desarrollo" })
}

export const saveUser = async (req, res) => {
    try {
        //Todo: Faltan validaciones de lo que viene en el body

        const newUsers = await usersService.save(req.body)
        res.send({ status: "success", payload: newUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el usuario." });
    }
}