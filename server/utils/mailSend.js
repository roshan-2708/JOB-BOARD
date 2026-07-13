const SibApiV3Sdk = require('sib-api-v3-sdk');

const mailSender = async (email, title, body) => {
    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;

        // API Key setup
        const apiKey = defaultClient.authentications['api-key'];
        // apiKey.apiKey = process.env.MAIL_PASS; // Aapki v3 API Key yahan jayegi
        apiKey.apiKey = process.env.BREVO_API_KEY; // ✅ correct

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        // Email Configuration
        sendSmtpEmail.subject = title;
        sendSmtpEmail.htmlContent = body;
        sendSmtpEmail.sender = { "name": "PORTFOLIO BUILDER", "email": process.env.MAIL_USER };
        sendSmtpEmail.to = [{ "email": email }];

        // Send call
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("✅ OTP Sent Successfully:", data.messageId);
        return data;

    } catch (error) {
        // Detailed error for debugging
        console.error("❌ Brevo SDK Error:", error.response ? error.response.body : error.message);
        throw new Error("Email delivery failed");
    }
};

module.exports = mailSender;