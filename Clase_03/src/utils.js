import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

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

