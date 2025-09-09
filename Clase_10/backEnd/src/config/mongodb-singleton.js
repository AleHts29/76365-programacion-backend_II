import mongoose from 'mongoose';
import config from './config.js';

export default class MongoDBSingleton {
    static #instance = null;

    constructor() {
        this.#connectMongoDB()
    }

    static getInstance() {
        if (!this.#instance) {
            this.#instance = new MongoDBSingleton()
        } else {
            console.log("Ya existe una instancia de MongoDBSingleton");
        }
        return this.#instance
    }


    #connectMongoDB = async () => {
        try {
            console.log("MongoDB URL: ", config.mongoUrl);

            await mongoose.connect(config.mongoUrl)
            console.log("Base de datos conectada con Moongose");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
}

