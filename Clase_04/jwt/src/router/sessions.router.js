import { Router } from "express";
import { userModel } from '../models/user.model.js'
import { createHash, isValidPassword, generateJWToken } from '../utils.js'
import passport from "passport";


const router = Router();


router.get('/github', passport.authenticate('github', {
    scope: '[user: email]'
}), async (req, res) => { })

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: "/api/github/error" }), async (req, res) => {

    const user = req.user


    // Levanto session
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    req.session.admin = true

    // redireccionamos
    res.redirect('/views/users')
})





//Login
router.post('/register', passport.authenticate('register', { failureRedirect: "/api/sessions/fail-register" }), async (req, res) => {

    // 03 - responder al cliente
    res.send({ status: "Success", payload: `Usuario creado con exito ` })

})


//Register
router.post('/login', passport.authenticate('login', { failureRedirect: "/api/sessions/fail-login" }), async (req, res) => {

    const user = req.user


    // // Levanto session
    // req.session.user = {
    //     name: `${user.first_name} ${user.last_name}`,
    //     email: user.email,
    //     age: user.age
    // }

    //Usamos JWT
    const access_token = generateJWToken(user)
    console.log("generateJWToken: ", access_token);


    res.send({ status: "Success", access_token: access_token })
})



router.get('/fail-register', (req, res) => {
    res.status(401).send({ error: "Failed to process register!" })
})


router.get('/fail-login', (req, res) => {
    res.status(401).send({ error: "Failed to process login!" })
})

export default router;