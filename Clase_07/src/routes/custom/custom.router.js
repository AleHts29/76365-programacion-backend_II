import { Router } from "express";
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../../utils.js";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    };

    getRouter() {
        console.log("getRouter()");

        return this.router
    }

    init() { }; //Esta inicialilzacion se usa para las clases heredadas.

    // get
    get(path, policies, ...callbacks) {
        console.log("Entrando por GET a custom router con Path: " + path);
        console.log(policies);

        this.router.get(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }


    // post
    post(path, policies, ...callbacks) {
        console.log("Entrando por POST a custom router con Path: " + path);
        console.log(policies);

        this.router.post(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }


    // put 
    put(path, policies, ...callbacks) {
        console.log("Entrando por POST a custom router con Path: " + path);
        console.log(policies);

        this.router.put(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }


    // delete
    delete(path, policies, ...callbacks) {
        console.log("Entrando por POST a custom router con Path: " + path);
        console.log(policies);

        this.router.delete(path,
            this.handlePolicies(policies),
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }



    /* =====================================
    =               METODOS                =
    ===================================== */
    handlePolicies = policies => (req, res, next) => {
        console.log("Politicas a evaluar:");
        console.log(policies);

        //Validar si tiene acceso publico:
        if (policies[0] === "PUBLIC") return next()

        //El JWT token se guarda en los headers de autorización.
        const authHeader = req.headers.authorization;
        console.log("Token present in header auth:");
        console.log(authHeader);
        if (!authHeader) {
            return res.status(401).send({ error: "User not authenticated or missing token." });
        }

        const token = authHeader.split(' ')[1]


        // Validamos token
        jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
            if (err) return res.status(403).send({ error: "Token invalid, Unauthorized!" });

            // Token Ok
            const userData = credentials.user
            console.log(userData); // QUE ME SALE EN CONSOLA ???
            // {
            //     "name": "Alejandro Huertas",
            //     "email": "test04@gmail.com",
            //     "age": 37,
            //     "role": "user"
            // }

            // Preguntamos si dentro del array policies se encuentra el user.role que me esta llegando con este usuario
            // userData.role se incuye en el array policies =  ["ADMIN"]
            if (!policies.includes(userData.role.toUpperCase())) return res.status(403).send({ error: "El usuario no tiene privilegios, revisa tus roles!" });


            // Si llegamos aqui, el rol del user si existe en el array de policies
            req.user = userData
            next()
        })


    }



    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.status(200).send({ status: "Success", payload: payload })
        res.sendInternalServerError = error => res.status(500).send({ status: "Error", error });
        res.sendClientError = error => res.status(400).send({ status: "Client Error, Bad request from client.", error });
        res.sendUnauthorizedError = error => res.status(401).send({ error: "User not authenticated or missing token." });
        res.sendForbiddenError = error => res.status(403).send({ error: "Token invalid or user with no access, Unauthorized please check your roles!" });
        next();
    }


    applyCallbacks(callbacks) {

        // callbacks = [ (req, res) => {...})]
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                // params[1] hace referencia al res
                params[1].status(500).send(error)
            }
        })
    }

};