export default class BusinessRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getAll = () => {
        return this.dao.getAll();
    }
    save = (business) => {
        return this.dao.save(business);
    }
    getById = (id) => {
        return this.dao.getById(id);
    }
    getBusinessesByCategory = (category) => {
        return this.dao.getBusinessesByCategory(category);
    }
}