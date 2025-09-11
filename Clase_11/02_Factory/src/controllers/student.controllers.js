import { studentService } from '../services/factory/factory.js';

import StudentsDTO from '../services/dto/student.dto.js';



export async function getAllStudents(req, res) {
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los estudiantes." });
    }
}


export async function saveStudent(req, res) {
    try {
        let newUser = new StudentsDTO(req.body)
        console.log("newUser_DTO: ", newUser);

        let result = await studentService.save(newUser);
        // let result = await studentService.save(req.body);

        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el estudiante." });
    }
}