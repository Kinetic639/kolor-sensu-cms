import { type NextRequest } from "next/server";
import { Resend } from "resend";
import { ContactEmail } from "@/components/email/ContactEmail";

interface ContactEmailProps {
	firstName: string;
	lastName: string;
	email: string;
	message?: string;
}

export async function POST(req: NextRequest): Promise<Response> {
	const resend = new Resend(process.env.RESEND_API_KEY);
	try {
		const body = (await req.json()) as ContactEmailProps;

		if (!body.email) {
			return new Response("Email is required", { status: 400 });
		}

		const options = {
			from: `Formularz kontaktowy <kontakt@kolorsensu.pl>`,
			to: process.env.RESEND_TARGET_EMAIL || "",
			subject: `Nowe pytanie od ${body.email}`,
			replyTo: `${body.firstName} ${body.lastName} <${body.email}>`,
			react: <ContactEmail {...body} />,
		};

		const { data, error } = await resend.emails.send(options);
		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		console.error("Failed to send email:", error);
		return new Response("Failed to send email", { status: 500 });
	}
}
