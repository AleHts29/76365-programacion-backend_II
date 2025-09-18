import config from "../config/config.js";
import twilio from "twilio";

const twilioClient = twilio(config.twilioAccountSID, config.twilioAuthToken);
const twilioSMSOptions = {
    body: 'Este es un mensaje de prueba desde Twilio y Node.js',
    from: config.twilioSmsNumber,
    to: config.twilioToSmsNumber
}


export const sendSMS = async (req, res) => {
    try {
        console.log("Enviando SMS usando Twilio...");
        console.log("twilioClient: ", twilioClient);
        const result = await twilioClient.messages.create(twilioSMSOptions);
        res.status(200).send({ success: "SMS enviado correctamente!", payload: result });
    } catch (error) {
        console.error("Hubo un problema enviando el SMS usando Twilio.");
        res.status(500).send({ error: error });
    }
}
