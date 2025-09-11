import MongoSingleton from '../../config/mongodb-singleton.js'
import config from '../../config/config.js'

async function initializeMongoService() {
    console.log("Inicializando servicios con MongoDB");
    try {
        // Utilizar  Singleton
        await MongoSingleton.getInstance()
    } catch (error) {
        console.log("Error inicializando servicios con MongoDB", error);
        process.exit();
    }

}




let studentService
let coursesService

switch (config.persistence) {
    case 'mongodb':
        initializeMongoService() // crea la conexion a la base de datos

        const { default: StudentServiceMongo } = await import('../db/students.service.js');
        const { default: CourseServiceMongo } = await import('../db/courses.service.js');

        studentService = new StudentServiceMongo();
        console.log("Servico de estudiantes con MongoDB");
        console.log(studentService);

        coursesService = new CourseServiceMongo();
        console.log("Servico de cursos con MongoDB");
        console.log(coursesService);

        break;
    case 'fs':
        const { default: StudentServiceFile } = await import('../filesystem/students.service.js');
        const { default: CourseServiceFile } = await import('../filesystem/courses.service.js');

        studentService = new StudentServiceFile();
        console.log("Servico de estudiantes con File System");
        console.log(studentService);

        coursesService = new CourseServiceFile();
        console.log("Servico de cursos con File System");
        console.log(coursesService);

        break;

    case 'memory':
        // Implementacion en memoria
        break

    case 'firebase':
        // Implementacion en firebase
        break

    default:
        break;
}


export { studentService, coursesService }