import nodemailer from "nodemailer";

export async function sendMail({
    to,
    subject,
    html = "",
    text = "",
}) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `"JobReady" <job-ready@gmail.com>`,
        to,
        subject,
        text,
        html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
}
