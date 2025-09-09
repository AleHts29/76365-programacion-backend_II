// necesito importar servicios
import {
    obtenerDatosService,
    crearDatoService,
    updateDatoService,
    deleteDatoService,
} from '../services/product.service.js'


const getDatosControllers = async (req, res) => {
    // Le pido a servicio todo el listado de products
    const datos = await obtenerDatosService();
    res.send({ status: "Success", payload: datos })
}

const postDatosControllers = async (req, res) => {
    const dataProduct = req.body

    //TODO: Faltan Validaciones

    const result = await crearDatoService(dataProduct)
    res.send({ status: "Success", payload: result })
}

const putDatosControllers = async (req, res) => {
    // updateDatoService()
}

const deleteDatosControllers = async (req, res) => {
    // deleteDatoService()
}


export {
    getDatosControllers,
    postDatosControllers,
    putDatosControllers,
    deleteDatosControllers,
}