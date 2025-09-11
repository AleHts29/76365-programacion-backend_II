// importamo DAO Studetns
// importamos DAO Courses
import StudentServiceDao from './dao/mongo/students.service.js'
import CoursesServicesDAO from "./dao/mongo/courses.service.js"



// importamos Repository Students
// importamos Repository Courses
import StudentRepository from './repository/students.repository.js'
import CoursesRepository from './repository/courses.repository.js'


// Crear instancia de los DAOs
const studentServiceDao = new StudentServiceDao();
const coursesServicesDAO = new CoursesServicesDAO();


// Exportar los servicios - instancias de los Repositories
export const studentService = new StudentRepository(studentServiceDao);
export const coursesService = new CoursesRepository(coursesServicesDAO);







