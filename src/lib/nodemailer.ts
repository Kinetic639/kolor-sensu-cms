import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export const smtpEmail = process.env.NEXT_PUBLIC_MAIL_USER;
export const smtpPassword = process.env.NEXT_PUBLIC_MAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: smtpEmail,
		pass: smtpPassword,
	},
} as SMTPTransport.Options);
