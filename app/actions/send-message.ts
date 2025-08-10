"use server";

import nodemailer from "nodemailer";

// Create a transporter object
const transporter = nodemailer.createTransport({
	service: "gmail", // You can use other services like 'outlook', 'yahoo', etc.
	auth: {
		// These should ideally come from environment variables
		user: process.env.EMAIL_USER || "your-email@gmail.com",
		pass: process.env.EMAIL_PASSWORD || "your-app-password", // Use app password for Gmail
	},
});

export async function sendMessage(prevState: any, formData: FormData) {
	const name = String(formData.get("name") || "").trim();
	const email = String(formData.get("email") || "").trim();
	const message = String(formData.get("message") || "").trim();

	if (!name || !email || !message) {
		return { ok: false, message: "Please fill out all fields." };
	}

	try {
		// Email validation using simple regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return {
				ok: false,
				message: "Please provide a valid email address.",
			};
		}

		// Define the email options
		const mailOptions = {
			from: email,
			to: process.env.RECIPIENT_EMAIL || "soumyaraj2003@gmail.com", // Your email from data.json
			subject: `Portfolio Contact: Message from ${name}`,
			text: message,
			html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
		};

		// Send the email
		await transporter.sendMail(mailOptions);
		console.log("[Contact] Message sent successfully from:", {
			name,
			email,
		});

		return {
			ok: true,
			message: `Thanks ${name}, I'll get back to you at ${email} soon!`,
		};
	} catch (error) {
		console.error("[Contact] Error sending message:", error);
		return {
			ok: false,
			message:
				"Failed to send message. Please try again or contact me directly via email.",
		};
	}
}
