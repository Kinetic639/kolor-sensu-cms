import React from "react";
import { Html, Head, Body, Container, Heading, Text } from "@react-email/components";

export const TestResultsEmail = ({
	email,
	phone,
	answers,
}: {
	email: string;
	phone: string;
	answers: Record<string, unknown>;
}) => {
	return (
		<Html>
			<Head />
			<Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
				<Container>
					<Heading>Nowe wyniki testu</Heading>

					<Text>
						<strong>Email:</strong> {email}
					</Text>
					<Text>
						<strong>Telefon:</strong> {phone}
					</Text>

					<Heading>Odpowiedzi:</Heading>
					<ul>
						{Object.entries(answers).map(([question, answer]) => (
							<li key={question}>
								<strong>{question}:</strong> {String(answer)}
							</li>
						))}
					</ul>

					<Text>Skontaktuj się z użytkownikiem, aby omówić wyniki testu.</Text>
				</Container>
			</Body>
		</Html>
	);
};
