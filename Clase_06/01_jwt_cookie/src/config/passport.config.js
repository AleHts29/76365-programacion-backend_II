import passport from 'passport';
import userModel from '../models/user.model.js';
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from '../utils.js';

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
    //Estrategia de obtener Token JWT por Cookie:
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        console.log("Entrando a PassPort_JWT");
        try {
            console.log("JWT Obtenido del payload: ", jwt_payload);
            return done(null, jwt_payload.user)
        } catch (error) {
            return done(error)
        }
    }))




    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
};


const cookieExtractor = req => {
    let token = null;
    console.log('Estramos en cookieExtractor');
    if (req && req.cookies) {
        console.log('Cookies presentes: ', req.cookies);
        token = req.cookies['jwtCookieToken'] // me retorna el valor de la cookie <-- este seria el JWT
        console.log("JWT de la cookie: ", token);
    }

    return token;
}


export default initializePassport;
