"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { FormData } from "@/components/forms/schema";
import FormInput from "@/components/forms/atoms/FormInput";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

const Step9: React.FC = () => {
	const {
		register,
		formState: { errors, isSubmitting },
		watch,
	} = useFormContext<FormData>();

	const email = watch("email");
	const phone = watch("phone");
	const agreement = watch("agreement");

	const isSubmitDisabled = !email || !phone || !agreement || isSubmitting;

	return (
		<div className="flex flex-col items-center">
			<Typography as="h2" variant="h4" className="mt-4 text-center">
				Dziękujemy za wypełnienie testu!
			</Typography>
			<Typography as="p" variant="body1" className="mt-2 text-center">
				Podaj swój email i numer telefonu, aby omówić wyniki testu.
			</Typography>

			{/* Email Input */}
			<div className="mt-4 w-full max-w-md">
				<FormInput
					id="email"
					placeholder="Email"
					register={register("email", { required: "Email jest wymagany" })}
					error={errors.email}
					className="focus:ring-none mx-auto max-w-sm text-center focus:border-none"
				/>
			</div>

			{/* Phone Input */}
			<div className="mt-4 w-full max-w-md">
				<FormInput
					id="phone"
					placeholder="Numer telefonu"
					register={register("phone", {
						required: "Numer telefonu jest wymagany",
						pattern: {
							value: /^[0-9+\s]*$/,
							message: "Nieprawidłowy numer telefonu",
						},
					})}
					error={errors.phone}
					className="focus:ring-none mx-auto max-w-sm text-center focus:border-none"
				/>
			</div>

			{/* Terms and Conditions Checkbox */}
			<div className="mt-4 flex items-center">
				<input
					id="agreement"
					type="checkbox"
					className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					{...register("agreement", { required: "Zgoda jest wymagana" })}
				/>
				<label htmlFor="agreement" className="ml-2 block text-sm text-gray-900">
					Zgadzam się na kontakt
				</label>
			</div>
			{errors.agreement && <p className="mt-2 text-sm text-red-600">{errors.agreement.message}</p>}

			{/* Submit Button */}
			<div className="mt-6 w-full max-w-md">
				<button
					type="submit"
					disabled={isSubmitDisabled}
					className="w-full rounded-full border border-transparent bg-[#2e4554] px-10 py-3 text-white transition-all duration-150 hover:bg-background-secondary disabled:bg-gray-600 disabled:opacity-30"
				>
					{isSubmitting ? "Wysyłanie..." : "Prześlij"}
				</button>
			</div>
		</div>
	);
};

export default Step9;
