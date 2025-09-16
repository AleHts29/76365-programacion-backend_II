export default class OrdersRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getAll = () => {
        return this.dao.getAll();
    }
    save = (order) => {
        return this.dao.save(order);
    }
    getById = (id) => {
        return this.dao.getById(id);
    }
}