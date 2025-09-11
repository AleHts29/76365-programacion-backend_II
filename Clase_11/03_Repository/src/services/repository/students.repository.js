export default class StudentServiceMongo {
    constructor(dao) {
        this.dao = dao;
    }


    getAll = () => {
        const student = this.dao.getAll()
        return student
    }

    save = (student) => {
        let result = this.dao.save(student);
        return result;
    }

    findByUsername = (username) => {
        const result = this.dao.findByUsername({ email: username });
        return result;
    }

    update = async (filter, value) => {
        console.log("Update student with filter and value:");
        console.log(filter);
        console.log(value);
        let result = this.dao.update(filter, value);
        return result;
    }

}
