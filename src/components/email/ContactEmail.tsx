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

interface EmailProps {
	firstName: string;
	lastName: string;
	email: string;
	message?: string;
}

export const ContactEmail: React.FC<Readonly<EmailProps>> = ({
	firstName,
	lastName,
	email,
	message,
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
								Nowa wiadomość od{" "}
								<span className="text-3xl">
									{firstName} {lastName}
								</span>
							</Heading>
						</Section>

						{/* Message Section */}
						<Section className="rounded-md bg-[#F5F7FA]">
							<Text className="mt-12 text-center text-3xl font-semibold text-[#1C3F4F]">
								Wiadomość
							</Text>
							<Text className="mx-4 mb-6 text-xl">{message ? message : "Brak wiadomości"}</Text>
							<Hr className="my-3 border-t border-gray-300" />
						</Section>

						{/* Basic Information */}
						<Section className="mx-4 mt-8 p-4 text-center">
							<Text className="text-lg font-semibold text-[#1C3F4F]">📌 Podstawowe informacje</Text>
							<Text>
								<strong>Imię:</strong> {firstName}
							</Text>
							<Text>
								<strong>Nazwisko:</strong> {lastName}
							</Text>
							<Hr className="my-3 border-t border-gray-300" />
							<Text className="mt-8 text-lg font-semibold text-[#1C3F4F]">📞 Dane kontaktowe</Text>
							<Text>
								<strong>Email:</strong> {email}
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
