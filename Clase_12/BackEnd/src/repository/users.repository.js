export default class UserRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getAll = () => {
        return this.dao.getAll();
    }
    save = (user) => {
        return this.dao.save(user);
    }
    getById = (id) => {
        return this.dao.getById(id);
    }
}