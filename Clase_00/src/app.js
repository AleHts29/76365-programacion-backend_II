import express from 'express'
import mongoose from 'mongoose'
import userRouter from './router/user.router.js'



const app = express()
const PORT = 9090

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTER
app.use('/api/users', userRouter)



app.listen(PORT, () => {
    console.log(`Server run on Port: ${PORT}`);
})


// Conexion a la DB
// const DB_PATH = `mongodb://localhost:21017/clase12_60220?retryWrites=true&w=majority`
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


