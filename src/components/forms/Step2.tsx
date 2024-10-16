"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { type FormData } from "./schema"; // Import your schema
import { Typography } from "@/app/ui/atoms/Typography/Typography";

const Step2: React.FC = () => {
	const {
		formState: { errors },
		setValue,
		control,
		trigger,
	} = useFormContext<FormData>(); // Use the FormData type for useFormContext
	const name = useWatch<FormData>({ control, name: "name" }); // Now this uses the full form structure

	const handleRadioChange = async (value: string) => {
		setValue("moodRating", Number(value), { shouldValidate: true }); // Trigger validation after setting the value
		await trigger("moodRating");
	};

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				{name}, jak oceniasz swoje samopoczucie?
			</Typography>

			<div className="mt-4 flex items-center justify-between">
				{Array.from({ length: 11 }, (_, i) => (
					<motion.label
						whileHover={{ scale: 1.1 }}
						key={i}
						className={`cursor-pointer text-2xl transition-colors duration-200 ${
							errors.moodRating && "text-red-600"
						}`}
					>
						<input
							type="radio"
							value={i}
							onChange={(e) => handleRadioChange(e.target.value)}
							className="hidden"
						/>
						<span>{i}</span>
					</motion.label>
				))}
			</div>

			{errors.moodRating?.message && (
				<p className="mt-2 text-sm text-red-600">{errors.moodRating.message}</p>
			)}
		</div>
	);
};

export default Step2;
