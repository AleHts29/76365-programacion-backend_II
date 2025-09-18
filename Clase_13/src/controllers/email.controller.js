import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js';


// creamos transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailUser,
        pass: config.gmailPass
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take messages");
    }
});

// sin attachments
const mailOptions = {
    from: 'Servidor Node.js -' + config.gmailUser,
    to: config.gmailUser,
    subject: 'Enviando correo desde Node.js',
    html: `
    <div style="text-align: center;">
        <h1>Hola Mundo</h1>
        <p>Este es un correo de prueba enviado desde Node.js usando Nodemailer y Gmail</p>
    </div>
`,
    attachments: []
}

export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err, message: "No se pudo enviar el email desde:" + config.gmailUser });
            }

            console.log('Email sent: ' + info.messageId);
            res.send({ message: "Email enviado correctamente", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailUser });
    }
}



// con attachments
const mailOptionsWithAttachments = {
    from: 'Servidor Node.js -' + config.gmailUser,
    to: config.gmailUser,
    subject: 'Enviando correo desde Node.js con adjuntos',
    html: `
    <div style="text-align: center;">
        <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
        <p>Ahora usando imagenes: </p>
        <img src="cid:imagen1"/>
    </div>
`,
    attachments: [
        {
            filename: 'imagen1.png',
            path: __dirname + '/public/meme.png',
            cid: 'imagen1' // same cid value as in the html img src
        },
        {
            filename: 'pdf1.pdf',
            path: __dirname + '/public/reglamento.pdf',
            cid: 'pdf1' // same cid value as in the html img src
        },
    ]
}


export const sendEmailWithAttachments = (req, res) => {
    try {
        transporter.sendMail(mailOptionsWithAttachments, (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: err, message: "No se pudo enviar el email desde:" + config.gmailAccount });
            }

            console.log('Email sent: ' + info.messageId);
            res.send({ message: "Email enviado correctamente", payload: info })
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}