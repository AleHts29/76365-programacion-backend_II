import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;



// Configuracion Bcrypt

// createHash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))


// isValidPassword

export const isValidPassword = (passwordDB, passwordClient) => {
    console.log(`Datos a validar: user-passwordDB:${passwordDB} - passwordClientr:${passwordClient}`);

    return bcrypt.compareSync(passwordClient, passwordDB)

}



// JWT
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

// generacion de token
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '2h' })
}


// validacion de token - es un middleare
export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log('Lo que esta en Headers', authHeader);


    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticate or missing token" })
    }

    const token = authHeader.split(' ')[1]//Se hace el split para retirar la palabra Bearer.


    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });

        // Token ok
        req.user = credentials.user
        console.log(req.user);

        next()
    })
}


// ejemplo token
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
