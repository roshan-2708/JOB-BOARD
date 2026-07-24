const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (options) => {
    try {
        const client = SibApiV3Sdk.ApiClient.instance;

        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        const senderEmail = process.env.MAIL_USER || process.env.SENDER_EMAIL;
        const senderName = process.env.SENDER_NAME || "Job Board Team";

        sendSmtpEmail.sender = {
            email: senderEmail,
            name: senderName
        };

        sendSmtpEmail.to = [{ email: options.email }];
        sendSmtpEmail.subject = options.subject;
        sendSmtpEmail.textContent = options.message;
        sendSmtpEmail.htmlContent = options.html || `<div style="font-family: sans-serif; font-size: 15px; color: #333; line-height: 1.6;">${(options.message || '').replace(/\n/g, '<br>')}</div>`;

        // API Call
        const data = await emailApi.sendTransacEmail(sendSmtpEmail);

        console.log("✅ Email sent successfully! Message ID:", data.messageId);
        return data;

    } catch (error) {
        const detail = error.response ? (error.response.body || error.response.text) : error.message;
        console.error("❌ Email Error:", detail);
        throw error;
    }
};

module.exports = sendEmail;