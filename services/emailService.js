const axios = require('axios');
require('dotenv').config();

const serviceId = process.env.SERVICE_ID;
const templateId = process.env.TEMPLATE_ID;
const userId = process.env.USER_ID;

class MailServices {
    static async sendEmail(email,message) {
        const url = 'https://api.emailjs.com/api/v1.0/email/send';

        let name = "John Doe";

        const myMessage = `Please click on the link to verify your email\n\n\n Please ignore this email if you did not initiate this process`;

        try {
            const response = await axios.post(url, {
                service_id: serviceId,
                template_id: templateId,
                user_id: userId,
                template_params: {
                    to_email: email,  //address you're sending mail to
                    from_name: "Authentication", //name of email sender
                    to_name: 'receiver name', //name of email receiver
                    reply_to: 'email@example.com', //reply to address
                    subject: 'Email Verification',
                    message: message,
                },
            }, {
                headers: {
                    'origin': 'https://maifriend-server.onrender.com/',
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = MailServices;


//todo: usage
//MailServices.sendEmail();