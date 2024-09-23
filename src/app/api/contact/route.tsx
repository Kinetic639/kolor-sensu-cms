import { type NextRequest } from "next/server";
import { render } from "@react-email/components";
import { ContactEmail } from "@/components/email/ContactEmail";
import { smtpEmail, transporter } from "@/lib/nodemailer";

interface ContactEmailProps {
	firstName: string;
	lastName: string;
	email: string;
	message?: string;
}

export async function POST(req: NextRequest): Promise<Response> {
	try {
		const body = (await req.json()) as ContactEmailProps;

		if (!body.email) {
			return new Response("Email is required", { status: 400 });
		}

		// Ensure you await the render Promise to resolve the email HTML
		const emailHtml = await render(<ContactEmail {...body} />);

		const options = {
			from: "Formularz kontaktowy",
			to: smtpEmail,
			subject: `Nowe pytanie od ${body.email}`,
			html: emailHtml, // Make sure this is the resolved string
		};

		await transporter.sendMail(options);
		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Failed to send email:", error);
		return new Response("Failed to send email", { status: 500 });
	}
}
