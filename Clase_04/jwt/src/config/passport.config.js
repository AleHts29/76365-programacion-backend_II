import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2'
import { userModel } from '../models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'



// Declaramos la strategy
const localStrategy = passportLocal.Strategy

/**
 * Función para inicializar Passport y definir las estrategias de autenticación.
 */
const initializePassport = () => {

    /*=============================================
    =                GitHubStrategy               =
    =============================================*/
    passport.use('github', new GitHubStrategy({
        clientID: 'Iv23ctVJD4j2VA1TIEwk',
        clientSecret: 'd3a1ccd494292e832ba66adb375497eb81d92686',
        callbackUrl: 'http://localhost:9090/api/sessions/githubcallback'
    },

        async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido desde la cuenta de GitHub");
            console.log(profile);
            try {

                // buscamos user en DB con el mail que me llega de GitHub
                const user = await userModel.findOne({ email: profile._json.email })

                if (!user) {
                    console.log('Se da de alta el user');
                    const newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: profile._json.email,
                        loggedBy: 'GitHub'
                    }

                    const result = await userModel.create(newUser)
                    return done(null, result)
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))









    /* =====================================
    =               passportLocal          =
    ===================================== */
    // Register 
    passport.use('register', new localStrategy(
        {
            //Configuraciones
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },
        // implementacion
        async (req, username, isValidPassword, done) => {
            try {
                const { first_name, last_name, email, age, password } = req.body;
                console.log("Registrando newUser: ", req.body);

                // 01 - Verifico si el user ya existe en la DB
                const exist = await userModel.findOne({ email })
                if (exist) {
                    console.log("El usuario ya existe!..");
                    return done(null, false)
                }


                // Construimos un DTO 
                const userDTO = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)// <--- dataIn:123admin --- dataOut:$2a$12$ZiL4D5W/RaYt5vwPAsom6eBp63UiFeadp8Bknb/FwhPgWJWiMmsdq
                }

                // 02 - doy de alta a newUser
                const result = await userModel.create(userDTO)

                // Todo salió bien, retornamos el usuario registrado
                done(null, result)
            } catch (error) {
                return done("Error registrando el usuario - error:" + error)
            }
        }
    ))

    // Login
    passport.use('login', new localStrategy(
        {
            //Configuraciones
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },
        async (req, username, password, done) => {
            try {
                const { email, password } = req.body;
                const user = await userModel.findOne({ email })

                if (!user) return done(null, false)


                // Validamos el password con Bcrypt
                if (!isValidPassword(user.password, password)) {
                    return res.status(401).send({ status: "error", error: "Credenciales incorrectas" })
                }

                done(null, user)
            } catch (error) {
                return done("Error logueando el usuario - error:" + error)
            }
        }
    ))


    // Serialización
    /**
     * 📌 Serialización del Usuario
     * Se ejecuta después de una autenticación exitosa.
     * Passport almacena solo el `user._id` en la sesión en lugar de todo el objeto usuario.
     */
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    // Deserialización
    /**
  * 📌 Deserialización del Usuario
  * Cuando se hacen solicitudes autenticadas, Passport busca al usuario en la base de datos
  * usando el `id` guardado en la sesión.
  */
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })
}

export default initializePassport;

// La serialización de Passport se refiere al proceso de convertir el objeto de usuario de Passport en una cadena que puede ser almacenada o transmitida de manera segura. Esta cadena se utiliza típicamente para mantener la sesión de usuario entre las solicitudes del cliente y el servidor. 

// La serialización es importante para persistir la información de autenticación del usuario de una manera que sea eficiente y segura

// estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Estas funciones son esenciales cuando se implementa la autenticación de usuarios en una aplicación Node.js utilizando Passport.js.