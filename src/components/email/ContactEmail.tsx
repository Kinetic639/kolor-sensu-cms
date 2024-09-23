import React from "react";
import { Body, Container, Head, Heading, Html, Tailwind, Text } from "@react-email/components";

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
				<Body className="bg-white font-sans">
					<Container className="mx-auto my-10 w-full max-w-[600px] rounded-md border border-gray-200 p-4">
						<Heading className="mb-4 text-center text-xl font-bold">
							Nowa wiadomość wysłana z formularza kontaktowego
						</Heading>
						<Text className="mb-2 text-base">
							Otrzymałeś wiadomość od{" "}
							<strong>
								{firstName} {lastName}
							</strong>
						</Text>
						<Text className="mb-2 text-base">
							Osoba:{" "}
							<strong>
								{firstName} {lastName}
							</strong>
							.
						</Text>
						<Text className="mb-2 text-base">
							Email: <strong>{email}</strong>
						</Text>
						<Text className="mb-2 whitespace-pre-line text-base">
							<strong>Wiadomość:</strong>
							<br />
							{message}
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};
