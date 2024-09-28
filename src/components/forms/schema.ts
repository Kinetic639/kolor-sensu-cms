import { z } from "zod";

export const FormDataSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		consultationFor: z.enum(["me", "child", "couple"]).refine((val) => val !== undefined, {
			message: "Consultation type is required",
		}),
		email: z.string().min(1, "Email is required").email("Invalid email address").optional(),
		phone: z.string().min(1, "Phone number is required").optional(),

		// For "child" consultation type
		childName: z.string().min(1, "Child's name is required").optional(),
		childAge: z.number().min(1, "Child's age is required").optional(),

		// For "couple" consultation type
		partnerName: z.string().min(1, "Partner's name is required").optional(),
		relationshipDuration: z.string().min(1, "Relationship duration is required").optional(),

		// Common address fields
		country: z.string().min(1, "Country is required").optional(),
		street: z.string().min(1, "Street is required").optional(),
		city: z.string().min(1, "City is required").optional(),
		state: z.string().min(1, "State is required").optional(),
		zip: z.string().min(1, "Zip is required").optional(),
	})
	.refine(
		(data) => {
			if (data.consultationFor === "me" && (!data.email || !data.phone)) {
				return false;
			}
			if (data.consultationFor === "child" && (!data.childName || !data.childAge)) {
				return false;
			}
			if (data.consultationFor === "couple" && (!data.partnerName || !data.relationshipDuration)) {
				return false;
			}
			return true;
		},
		{
			message: "Please provide the necessary fields for the selected consultation type.",
		},
	);
