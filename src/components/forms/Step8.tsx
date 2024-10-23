"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import MultiSelect from "@/components/forms/atoms/MultiSelect";
import type { FormData } from "@/components/forms/schema"; // Use the same custom MultiSelect component

const Step8: React.FC = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<FormData>();

	const selectedNeeds = watch("neurodiversityNeeds") || [];

	const handleSelect = async (options: string[]) => {
		setValue("neurodiversityNeeds", options, { shouldValidate: true });
	};

	return (
		<div>
			<h2>Jakie są Twoje potrzeby związane z neuroróżnorodnością?</h2>
			<MultiSelect
				options={[
					"Lepsze zrozumienie własnych wzorców myślenia i działania",
					"Radzenie sobie z codziennymi wyzwaniami",
					"Przystosowanie środowiska pracy lub nauki",
					"Radzenie sobie z nadwrażliwością sensoryczną",
					"Lepsze zarządzanie emocjami",
					"Wsparcie w kontaktach społecznych i relacjach",
					"Nie wiem",
				]}
				selectedOptions={selectedNeeds}
				onSelect={handleSelect}
				layout="vertical"
			/>
			{errors.neurodiversityNeeds && (
				<p className="mt-2 text-sm text-red-600">{errors.neurodiversityNeeds.message}</p>
			)}
		</div>
	);
};

export default Step8;
