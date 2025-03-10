import React from "react";
import { Body, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components";

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

const diagnosisMapping: { [key: string]: string } = {
	"1": "Tak, mam diagnozę",
	"2": "Nie mam diagnozy, ale podejrzewam u siebie neuroróżnorodność",
	"3": "Nie mam pewności, potrzebuję konsultacji",
	"4": "Nie mam diagnozy i nie podejrzewam neuroróżnorodności",
};

export const ConsultationEmail: React.FC<Readonly<ConsultationEmailProps>> = ({
	name,
	moodRating,
	meetingType,
	emotionalDifficulties,
	lifeSupportAreas,
	helpfulSupport,
	neurodiversityDiagnosis,
	neurodiversityNeeds,
	email,
	phone,
	message,
	agreement,
}) => {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container className="mx-auto my-10 w-full max-w-[600px] rounded-md border border-gray-200 p-4">
						<Heading className="mb-4 text-center text-xl font-bold">
							Wyniki Testu od <strong>{name}</strong>
						</Heading>

						<Text className="mb-2 text-base">
							Imię: <strong>{name}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Ocena nastroju: <strong>{moodRating}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Rodzaj spotkania: <strong>{meetingType}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Trudności emocjonalne: <strong>{emotionalDifficulties.join(", ")}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Obszary wsparcia życiowego: <strong>{lifeSupportAreas.join(", ")}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Wsparcie, które byłoby pomocne: <strong>{helpfulSupport.join(", ")}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Diagnoza neurodywersyjna: <strong>{diagnosisMapping[neurodiversityDiagnosis]}</strong>
						</Text>
						{neurodiversityNeeds && neurodiversityNeeds.length > 0 && (
							<Text className="mb-2 text-base">
								Potrzeby neurodywersyjne: <strong>{neurodiversityNeeds.join(", ")}</strong>
							</Text>
						)}
						<Text className="mb-2 text-base">
							Email: <strong>{email}</strong>
						</Text>
						<Text className="mb-2 text-base">
							Telefon: <strong>{phone}</strong>
						</Text>
						{message && (
							<Text className="mb-2 whitespace-pre-line text-base">
								<strong>Wiadomość:</strong>
								<br />
								{message}
							</Text>
						)}
						<Text className="mb-2 text-base">
							Zgoda na kontakt: <strong>{agreement ? "Tak" : "Nie"}</strong>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};
