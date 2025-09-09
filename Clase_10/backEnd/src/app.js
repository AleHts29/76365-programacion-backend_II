import express from 'express';
import routerProduct from './routes/product.router.js'
import config from './config/config.js'
import MongoDBSingleton from './config/mongodb-singleton.js';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
app.use(express.json())
const PORT = config.port || 8080;



// cualquier cliente se puede conectar
// app.use(cors())


// Configura el middleware cors con opciones personalizadas
const corsOptions = {
    origin: 'http://127.0.0.1:5400', // Reemplaza con el origen permitido

    // Configura los métodos HTTP permitidos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

    // Configura las cabeceras permitidas
    allowedHeaders: 'Content-Type,Authorization',

    // Configura si se permiten cookies en las solicitudes
    credentials: true,
}
app.use(cors(corsOptions));

// API
app.use('/api', routerProduct)

app.get('/test', (req, res) => {
    res.send({ message: 'Test ok', timestamp: new Date().toLocaleString() })
})




app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})

// MongoDB connection
const mongoInstance = async () => {
    try {
        MongoDBSingleton.getInstance()
    } catch (error) {
        console.log(error);
    }
}


mongoInstance();
// mongoInstance(); // Ya se ha abierto una conexion a MongoDB.


// const mongoInstance2 = async () => {
//     try {
//         MongoDBSingleton.getInstance()
//     } catch (error) {
//         console.log(error);
//     }
// }
// mongoInstance2();



// // Sin singleton - conexion directa
// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(config.mongoUrl);
//         console.log("Conectado con exito a MongoDB usando Moongose en app.js");
//     } catch (error) {
//         console.error("No se pudo conectar a la BD usando Moongose: " + error);
//         process.exit();
//     }
// };
// connectMongoDB();

// connectMongoDB();
