// el service se comunica con la capa de acceso a los datos
import {
    recuperarDatos,
    guardarDato,
    apdateDatoById,
    deleteById,
} from '../models/products.models.js'

const obtenerDatosService = async () => {
    // Logica
    return await recuperarDatos()
}

const crearDatoService = async (data) => {
    data.id = Math.random();
    await guardarDato(data);
    return data;
}

const updateDatoService = async (id, data) => {
    //logica
    return await apdateDatoById(id, data)
}

const deleteDatoService = async (id) => {
    // logica

    return await deleteById(id)
}

export {
    obtenerDatosService,
    crearDatoService,
    updateDatoService,
    deleteDatoService,
}