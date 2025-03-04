import { z } from "zod";

export const FormDataSchema = z.object({
	step0: z.string().optional(),
	name: z.string().min(3, "Imię musi zawierać co najmniej 3 znaki"),
	moodRating: z
		.number()
		.min(0, "Ocena nie może być niższa niż 0")
		.max(10, "Ocena nie może być większa niż 10")
		.default(5),
	meetingType: z
		.string({ required_error: "Wybierz rodzaj spotkania" })
		.min(3, { message: "Wybierz rodzaj spotkania" }),
	emotionalDifficulties: z
		.array(z.string(), { required_error: "Wybierz przynajmniej jedną trudność emocjonalną" })
		.min(1, { message: "Wybierz przynajmniej jedną trudność emocjonalną" }),
	lifeSupportAreas: z
		.array(z.string(), { required_error: "Wybierz przynajmniej jeden obszar życia" })
		.min(1, "Wybierz przynajmniej jeden obszar życia"),
	helpfulSupport: z

		.array(z.string(), {
			required_error: "Wybierz przynajmniej jedno wsparcie, które byłoby dla Ciebie pomocne",
		})
		.min(1, "Wybierz przynajmniej jedno wsparcie, które byłoby dla Ciebie pomocne"),
	neurodiversityDiagnosis: z
		.string({ required_error: "Wybierz jedną z opcji dotyczących diagnozy" })
		.min(1, { message: "Wybierz jedną z opcji dotyczących diagnozy" })
		.default(""),
	neurodiversityNeeds: z.array(z.string()).optional(),
	email: z.string().email("Podaj prawidłowy adres email").min(1, "Email jest wymagany"),
	agreement: z.boolean().refine((value) => value, {
		message: "Musisz zaakceptować warunki",
	}),
	phone: z
		.string()
		.min(1, "Numer telefonu jest wymagany")
		.regex(/^[0-9+\s]*$/, "Nieprawidłowy numer telefonu"),
});

export type FormData = z.infer<typeof FormDataSchema>;
