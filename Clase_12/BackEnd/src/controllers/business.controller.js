import { businessService } from '../services/services.js'

// Instancia del servicio
// const businessService = new BusinessService()



export const getBusiness = async (req, res) => {
    try {
        const business = await businessService.getAll()
        res.send({ status: "success", payload: business });
    } catch (error) {
        console.error("Hubo un problema conectandose a la persistencia de business.");
        res.status(500).send({ error: error });
    }
}
export const getBusinessById = async (req, res) => {
    res.send({ message: "No implementado", payload: "getBusiness en desarrollo" })
}
export const saveBusiness = async (req, res) => {
    try {
        // Todo: Faltan validaciones de lo que viene en el body
        const newBusiness = await businessService.save(req.body)
        res.send({ status: "success", payload: newBusiness });
    } catch (error) {
        console.error("Hubo un problema creando el business.");
        res.status(500).send({ error: error });
    }
}
export const getBusinessByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const business = await businessService.getBusinessesByCategory(category);
        res.send({ status: "success", payload: business });
    } catch (error) {
        console.error("Hubo obteniendo la categoria del business.");
        res.status(500).send({ error: error });
    }
}