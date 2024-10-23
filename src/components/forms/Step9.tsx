"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { FormData } from "@/components/forms/schema";

const Step9: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormData>();

	return (
		<div className="flex flex-col items-center">
			<h2 className="mt-4 text-lg font-bold">Dziękujemy za wypełnienie testu!</h2>
			<p className="mt-2 text-center">Proszę podaj swój email, aby otrzymać wyniki.</p>

			{/* Email Input */}
			<div className="mt-4">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700">
					Email
				</label>
				<input
					id="email"
					type="email"
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					{...register("email")}
				/>
				{errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
			</div>

			{/* Terms and Conditions Checkbox */}
			<div className="mt-4 flex items-center">
				<input
					id="agreement"
					type="checkbox"
					className="h-4 w-4 rounded border-gray-300 text-indigo-600"
					{...register("agreement")}
				/>
				<label htmlFor="agreement" className="ml-2 block text-sm text-gray-900">
					Zgadzam się na warunki
				</label>
			</div>
			{errors.agreement && <p className="mt-2 text-sm text-red-600">{errors.agreement.message}</p>}

			{/* Submit Button */}
			<button type="submit" className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
				Prześlij
			</button>
		</div>
	);
};

export default Step9;
