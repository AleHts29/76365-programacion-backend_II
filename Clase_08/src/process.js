import { Command } from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'puerto del servidor', 9090)
    .option('-mode <mode>', 'Modo de trabajo', 'dev')
    .requiredOption('-u <user>', 'Usuario que va a utilizar el aplicativo.', 'No se ha declarado un usuario.');//RequireOption usa un mensaje por defecto si no está presente la opción.

program.parse(); // Parsea los comando y valida si con correctos

// console.log("Options: ", program.opts());
// console.log("Puerto: ", program.opts().p);
// console.log("Modo: ", program.opts().Mode);



// Eventos de Listener
process.on('exit', code => {
    console.log("Este codigo se ejecuta antes de salir del proceso: ", code);
})

process.on('uncaughtException', exception => {
    console.log("Esta Exception no fue capturada o controlada: ", exception);
})


process.on('message', message => {
    console.log("Este codigo se ejecuta cuando reciba un mensaje: ", message);
})





export default program;