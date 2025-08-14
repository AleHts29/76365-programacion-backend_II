import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import passport from 'passport'

import userRouter from './router/user.router.js';
import viewsRouter from './router/views.router.js';
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js'

import usersViewRouter from './router/users.views.router.js'
import sessionsRouter from './router/sessions.router.js'


const app = express()
// const fileStorage = FileStore(session)
const PORT = 9090



//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// HBs
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))


const MONGO_URL = "mongodb://localhost:27017/clase19?retryWrites=true&w=majority";

// Session - inicializacion
app.use(session({
    //ttl: Time to live in seconds,
    //retries: Reintentos para que el servidor lea el archivo del storage.
    //path: Ruta a donde se buscará el archivo del session store.

    // 01_Usando --> session-file-store
    // store: new fileStorage({ path: "./sessions", ttl: 15, retries: 3 }),


    // 02_Usando --> connect-mongo
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 180 // ttl en seg
    }),

    secret: 'c0d3rS3cr3t',
    resave: true,
    saveUninitialized: true
}))

// Configuraciones Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())


// ROUTER
app.use('/api/users', userRouter)
app.use('/', viewsRouter)



// Ejem - primer login
app.use("/views/users", usersViewRouter)
app.use("/api/sessions", sessionsRouter)


app.listen(PORT, () => {
    console.log(`Server run on Port: ${PORT}`);
})


// Conexion a la DB
const connectMongo = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log(`Conectado con exito a la DB...`);

    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}
connectMongo()


