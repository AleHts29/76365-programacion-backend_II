import { Router } from "express";
import { userModel } from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import passport from "passport";


const router = Router();



//Login
router.post('/register', passport.authenticate('register', { failureRedirect: "/api/sessions/fail-register" }), async (req, res) => {

    // 03 - responder al cliente
    res.send({ status: "Success", payload: `Usuario creado con exito ` })

})


//Register
router.post('/login', passport.authenticate('login', { failureRedirect: "/api/sessions/fail-login" }), async (req, res) => {

    const user = req.user


    // Levanto session
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }


    res.send({ status: "Success", payload: req.session.user, message: "Primer logueo realizado!!.." })
})



router.get('/fail-register', (req, res) => {
    res.status(401).send({ error: "Failed to process register!" })
})


router.get('/fail-login', (req, res) => {
    res.status(401).send({ error: "Failed to process login!" })
})

export default router;