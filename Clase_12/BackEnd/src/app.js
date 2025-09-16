import express from 'express';
import MongoSingleton from './config/mongodb-singleton.js';
import cors from 'cors';
import config from './config/config.js';
//import Routers
import userRouter from './routers/user.router.js';
import businessRouter from './routers/business.router.js';
import orderRouter from './routers/order.router.js';


const app = express();
const PORT = config.port;


// JSON Setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/ping', (req, res) => {
    res.send('pong!');
});



//Declare routers:
app.use("/api/users", userRouter)
app.use("/api/business", businessRouter)
app.use("/api/orders", orderRouter)






app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


// Esta configuracion solo se usa si NO estoy usando una FACTORY
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
        process.exit();
    }
};
mongoInstance();