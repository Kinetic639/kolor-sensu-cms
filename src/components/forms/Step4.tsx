"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import MultiSelect from "@/components/forms/atoms/MultiSelect";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import HelperText from "@/components/forms/atoms/HelperText";
import type { FormData } from "@/components/forms/schema"; // Importing the custom MultiSelect component

const Step4: React.FC = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<FormData>();
	const selectedDifficulties = watch("emotionalDifficulties") || [];

	const handleSelect = (options: string[]) => {
		setValue("emotionalDifficulties", options, { shouldValidate: true });
	};

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				Z jakimi trudnościami emocjonalnymi aktualnie się zmagasz?
			</Typography>
			<MultiSelect
				options={[
					"Lęk",
					"Depresja",
					"Stres",
					"Trudności w relacjach",
					"Trudności z koncentracją i pamięcią",
					"Bezsenność lub wybudzanie się",
					"Niskie poczucie własnej wartości",
					"Wypalenie zawodowe",
					"Trudności w podejmowaniu decyzji",
					"Trudno powiedzieć",
				]}
				selectedOptions={selectedDifficulties}
				onSelect={handleSelect}
				layout="horizontal"
			/>

			{typeof errors.emotionalDifficulties?.message === "string" && (
				<HelperText>{errors.emotionalDifficulties.message}</HelperText>
			)}
		</div>
	);
};

export default Step4;
