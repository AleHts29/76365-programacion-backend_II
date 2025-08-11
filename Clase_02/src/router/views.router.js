import { Router } from "express";
import cookieParser from 'cookie-parser';

const router = Router()

// sin Firma <-- es menos segura
// router.use(cookieParser())

// con Firma <-- tiene algo de seguridad
router.use(cookieParser("CoderS3cr3t0C0d3"))


// Seteo de cookie
router.get('/setCookie1', (req, res) => {
    //sin Firma
    // res.cookie('coderCookie1', "Esta es una cookie_01 sin firma!!...", { maxAge: 100000 }).send("Cookie asignada con exito!!")


    //con firma
    res.cookie('coderCookie1', "Esta es una cookie_01 con firma!!...", { maxAge: 100000, signed: true }).send("Cookie asignada con exito!!")

})
router.get('/setCookie2', (req, res) => {
    //sin Firma
    res.cookie('coderCookie2', "Esta es una cookie_02 sin firma!!...", { maxAge: 100000 }).send("Cookie asignada con exito!!")
})



// obtengo cookie
router.get('/getCookie', (req, res) => {
    //sin firma
    // res.send(req.cookies.coderCookie2) <-- esto obtiene una cookie especifica
    // res.send(req.cookies)// <-- esto obtiene todas las cookies


    //con firma
    res.send(req.signedCookies)
})


router.get('/deleteCookie', (req, res) => {
    let cookieKye = 'coderCookie1'
    res.clearCookie(cookieKye).send('Cookie borrada!..')
})



router.get("/", (req, res) => {
    res.render('index', {})
})

router.get("/cliente", (req, res) => {
    res.render('cookies', {})
})

router.post('/set-cookie', (req, res) => {
    const { correo, nombre } = req.body
    console.log(req.body);

    //con firma
    res.cookie(nombre, correo, { maxAge: 100000, signed: true }).send("Cookie asignada con exito!!")

})




/* =====================================
=           2da -  Sessions           =
===================================== */

router.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado el sitio: '${req.session.counter}' veces`)
    } else {
        req.session.counter = 1
        res.send("Bienvenido!!..")
    }
})


// login - simulado
router.get('/login', (req, res) => {
    const { username, password } = req.query;

    // Validar - simulamos la consulta a la DB
    if (username !== 'pepe' || password !== '123admin') {
        return res.status(401).send("Login Failed!..")
    }

    // Creamos la sesion 
    req.session.user = username
    req.session.admin = true

    res.send("Login Success!..")
})

// logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ error: 'Error logout', message: "Error al cerrar la sesion" })
        }

        res.send("Session cerrada correctamente!!...")
    })
})


// Middleware de Auth
function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        console.log("Autenticacion validada de forma exitosa!..");
        return next()
    }

    // Aqui fallo la Auth
    res.status(403).send("Usuario no autorizado para ingresar a la vista privada!!..")
}



// private - simulado un perfil de un usuario
router.get('/private', auth, (req, res) => {
    res.send("Si estas viendo esto.. es porque tenes permisos")
})





export default router;