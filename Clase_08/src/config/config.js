import dotenv from 'dotenv';
import program from '../process.js';



const enviroment = program.opts().Mode
console.log("enviroment: ", enviroment);



dotenv.config(
    {
        path: enviroment === 'dev' ? './src/config/.env.development' : './src/config/.env.production'
    }
)





export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
}