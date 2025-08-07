import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';


import userRouter from './router/user.router.js';
import viewsRouter from './router/views.router.js';
import __dirname from './utils.js';


const app = express()
const PORT = 9090

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// HBs
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');


// Session - inicializacion
app.use(session({
    secret: 'c0d3rS3cr3t',
    resave: true,
    saveUninitialized: true
}))




// ROUTER
app.use('/api/users', userRouter)
app.use('/', viewsRouter)



app.listen(PORT, () => {
    console.log(`Server run on Port: ${PORT}`);
})


// Conexion a la DB
const DB_PATH = `mongodb://localhost:27017/clase12_60220`
const connectMongo = async () => {
    try {
        await mongoose.connect(DB_PATH)
        console.log(`Conectado con exito a la DB...`);

    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongo()


