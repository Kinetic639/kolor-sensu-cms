import { type NextRequest } from "next/server";
import { Resend } from "resend";
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
	const resend = new Resend(process.env.RESEND_API_KEY);
	try {
		const body = (await req.json()) as ConsultationEmailProps;

		if (!body.email) {
			return new Response("Email is required", { status: 400 });
		}

		const options = {
			from: `Nowy Test <konsultacja@kolorsensu.pl>`,
			to: process.env.RESEND_TARGET_EMAIL || "",
			subject: `Nowe wyniki konsultacji od ${body.email}`,
			replyTo: `${body.email}`,
			react: <ConsultationEmail {...body} />,
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
