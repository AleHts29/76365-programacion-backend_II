import { ordersService } from '../services/services.js'
// Instancia del servicio
// const orderService = new OrderService()

export const getOrders = async (req, res) => {
    try {
        const orders = await ordersService.getAll()
        res.send({ status: "success", payload: orders });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes", error: error.message });
    }
}


export const getOrderById = async (req, res) => {
    try {
        const { uid } = req.params;
        const order = await ordersService.getById(uid);
        if (order) {
            res.send({ status: "success", payload: order });
        } else {
            res.status(404).json({ message: "Orden no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener orden por ID", error: error.message });
    }
}


export const saveOrder = async (req, res) => {
    try {
        // Todo: Faltan validaciones de lo que viene en el body
        const newOrder = await ordersService.save(req.body)
        res.status(201).send({ status: "success", payload: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar la orden", error: error.message });
    }
}