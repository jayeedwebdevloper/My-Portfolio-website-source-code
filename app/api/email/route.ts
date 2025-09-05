import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Gmail_ID,
                pass: process.env.Gmail_Pass,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.Gmail_ID,
            subject: subject || `New message from ${name}`,
            text: `
        You have a new message from your contact form:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `,
            html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error sending email:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}