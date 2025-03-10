"use client";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import type { FormData } from "@/components/forms/schema";
import HelperText from "@/components/forms/atoms/HelperText";

const Step7: React.FC = () => {
	const {
		register,
		control,
		setValue,
		trigger,
		formState: { errors },
	} = useFormContext<FormData>();

	const selectedNeurodiversityDiagnosis = useWatch({
		control,
		name: "neurodiversityDiagnosis",
		defaultValue: "",
	});

	const handleRadioChange = async (value: string) => {
		setValue("neurodiversityDiagnosis", value, { shouldValidate: true });
		await trigger("neurodiversityDiagnosis"); // Trigger validation after setting the value
	};

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				Czy masz diagnozę związaną z neuroróżnorodnością?
			</Typography>
			<div className="mx-auto my-10 flex max-w-screen-md flex-col space-y-6">
				{[
					{ label: "Tak, mam diagnozę", value: "1" },
					{ label: "Nie mam diagnozy, ale podejrzewam u siebie neuroatypowość", value: "2" },
					{ label: "Nie mam pewności, potrzebuję konsultacji", value: "3" },
					{
						label: "Nie mam diagnozy i nie podejrzewam neuroatypowośco",
						value: "4",
					},
				].map((option) => (
					<motion.label
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.95 }}
						key={option.value}
						className={`relative flex cursor-pointer items-center justify-between rounded-full border p-4 px-6 shadow-md transition-all duration-300 ${
							selectedNeurodiversityDiagnosis === option.value
								? "border-[#2e4554] bg-[#2e4554] text-white"
								: "border-gray-300 bg-white text-[#2e4554]"
						}`}
					>
						<input
							type="radio"
							value={option.value}
							{...register("neurodiversityDiagnosis", { required: true })}
							onChange={(e) => handleRadioChange(e.target.value)}
							className="hidden"
						/>
						<span>{option.label}</span>
						<span className="">&rarr;</span>
					</motion.label>
				))}
			</div>

			{errors.neurodiversityDiagnosis?.message && (
				<HelperText>{errors.neurodiversityDiagnosis.message}</HelperText>
			)}
		</div>
	);
};

export default Step7;
