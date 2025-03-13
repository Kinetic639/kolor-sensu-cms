import React from "react";
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Tailwind,
	Text,
	Section,
	Hr,
} from "@react-email/components";

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
}

const diagnosisMapping: { [key: string]: string } = {
	"1": "Tak, mam diagnozę",
	"2": "Nie mam diagnozy, ale podejrzewam u siebie neuroróżnorodność",
	"3": "Nie mam pewności, potrzebuję konsultacji",
	"4": "Nie mam diagnozy i nie podejrzewam neuroróżnorodności",
};

// Mood emojis based on the test UI
const moodEmojis = ["🫥", "😰", "😩", "😔", "😕", "😶", "🙂", "😊", "😄", "😁", "🥳"];

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
}) => {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body className="bg-[#D8DCCF] font-sans">
					<Container className="mx-auto my-10 w-full max-w-[800px] rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
						{/* Header */}
						<Section className="rounded-t-md bg-[#1C3F4F] py-6 text-center text-white">
							<Heading className="py-6 text-xl font-bold">
								Nowe zgłoszenie od <span className="text-3xl">{name}</span>
							</Heading>
						</Section>

						{/* Mood Section */}
						<Section className="rounded-md bg-[#F5F7FA] text-center">
							<Text className="mt-12 text-3xl font-semibold text-[#1C3F4F]">Samopoczucie</Text>
							<Text className="mb-6 text-center text-3xl">
								<span className="mr-4 text-3xl"> {moodRating}/10</span>{" "}
								<span className="text-3xl">{moodEmojis[moodRating]}</span>
							</Text>
							<Hr className="my-3 border-t border-gray-300" />
							{/* Emotional Difficulties */}
							<Text className="text-lg font-semibold text-[#1C3F4F]">
								Z jakimi trudnościami emocjonalnymi aktualnie się zmagasz?
							</Text>
							<Text>
								{emotionalDifficulties.length > 0
									? emotionalDifficulties.join(", ")
									: "Brak odpowiedzi"}
							</Text>
							<Hr className="my-3 border-t border-gray-300" />

							{/* Life Support Areas */}
							<Text className="text-lg font-semibold text-[#1C3F4F]">
								Obszary życia, w których czujesz, że potrzebujesz wsparcia:
							</Text>
							<Text>
								{lifeSupportAreas.length > 0 ? lifeSupportAreas.join(", ") : "Brak odpowiedzi"}
							</Text>
							<Hr className="my-3 border-t border-gray-300" />

							{/* Helpful Support */}
							<Text className="text-lg font-semibold text-[#1C3F4F]">
								Jakie wsparcie byłoby dla Ciebie pomocne?
							</Text>
							<Text>
								{helpfulSupport.length > 0 ? helpfulSupport.join(", ") : "Brak odpowiedzi"}
							</Text>
							<Hr className="my-3 border-t border-gray-300" />
							<Text className="text-lg font-semibold text-[#1C3F4F]">
								🧩 Informacje neurodywersyjne
							</Text>
							<Text>
								<strong>Diagnoza:</strong> {diagnosisMapping[neurodiversityDiagnosis]}
							</Text>
							{neurodiversityNeeds && neurodiversityNeeds.length > 0 && (
								<Text className="mb-12">
									<strong>Potrzeby neurodywersyjne:</strong> {neurodiversityNeeds.join(", ")}
								</Text>
							)}
						</Section>

						{/* Basic Information */}
						<Section className="mx-4 mt-8 p-4 text-center">
							<Text className="text-lg font-semibold text-[#1C3F4F]">📌 Podstawowe informacje</Text>
							<Text>
								<strong>Imię:</strong> {name}
							</Text>
							<Text>
								<strong>Rodzaj spotkania:</strong> {meetingType}
							</Text>
							<Hr className="my-3 border-t border-gray-300" />
							<Text className="mt-8 text-lg font-semibold text-[#1C3F4F]">📞 Dane kontaktowe</Text>
							<Text>
								<strong>Email:</strong> {email}
							</Text>
							<Text>
								<strong>Telefon:</strong> {phone}
							</Text>
							<Hr className="my-3 border-t border-gray-300" />
						</Section>

						{/* Footer */}
						<Section className="mt-6 text-center text-sm text-gray-600">
							<Text>KolorSensu | © {new Date().getFullYear()} Wszystkie prawa zastrzeżone</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};
