const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (options) => {
    try {
        const client = SibApiV3Sdk.ApiClient.instance;

        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY; 

        const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

        const sender = {
            email: process.env.MAIL_USER, 
            name: "Job-Board"
        };

        const receivers = [
            {
                email: options.email 
            }
        ];

        // API Call
        const data = await emailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: options.subject,
            textContent: options.message
        });

        console.log("✅ Email sent successfully! Message ID:", data.messageId);

    } catch (error) {
        console.error("❌ Email Error:", error.response ? error.response.text : error.message);
    }
};

module.exports = sendEmail;