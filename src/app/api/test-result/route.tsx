import { type NextRequest } from "next/server";
import { render } from "@react-email/components";
import { smtpEmail, transporter } from "@/lib/nodemailer";
import { ConsultationEmail } from "@/components/email/ConsultationEmail";

interface ConsultationEmailProps {
	name: string;
	moodRating: number;
	meetingType: string;
	emotionalDifficulties: string[];
	lifeSupportAreas: string[];
	helpfulSupport: string[];
	neurodiversityDiagnosis: string;
	neurodiversityNeeds?: string[];
	email: string;
	phone: string;
	message?: string;
	agreement: boolean;
}

export async function POST(req: NextRequest): Promise<Response> {
	try {
		const body = (await req.json()) as ConsultationEmailProps;

		if (!body.email) {
			return new Response("Email is required", { status: 400 });
		}

		// Ensure you await the render Promise to resolve the email HTML
		const emailHtml = await render(<ConsultationEmail {...body} />);

		const options = {
			from: "Formularz konsultacji",
			to: smtpEmail,
			subject: `Nowe wyniki konsultacji od ${body.email}`,
			html: emailHtml, // Make sure this is the resolved string
		};

		await transporter.sendMail(options);
		return new Response("OK", { status: 200 });
	} catch (error) {
		console.error("Failed to send email:", error);
		return new Response("Failed to send email", { status: 500 });
	}
}
