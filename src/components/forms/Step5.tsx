"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import MultiSelect from "@/components/forms/atoms/MultiSelect";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import type { FormData } from "@/components/forms/schema";
import HelperText from "@/components/forms/atoms/HelperText"; // Importing the custom MultiSelect component

const Step5: React.FC = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<FormData>();
	const selectedAreas = watch("lifeSupportAreas") || [];

	const handleSelect = (options: string[]) => {
		setValue("lifeSupportAreas", options, { shouldValidate: true });
	};

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				Obszary życia, w których czujesz, że potrzebujesz wsparcia
			</Typography>
			<MultiSelect
				options={[
					"Emocjonalne (np. radzenie sobie z emocjami, regulacja emocji)",
					"Relacyjne (np. poprawa komunikacji z innymi, bliskie związki)",
					"Zawodowe (np. stres w pracy, brak motywacji)",
					"Edukacyjne (np. trudności w nauce, przyswajaniu wiedzy)",
					"Rozwój osobisty (np. lepsze zrozumienie siebie, rozwijanie nowych umiejętności)",
					"Rodzinne (np. trudności w relacjach rodzinnych)",
					"Trudno powiedzieć",
				]}
				selectedOptions={selectedAreas}
				onSelect={handleSelect}
				layout="vertical" // Set the layout to horizontal for this step
			/>
			{errors.lifeSupportAreas && <HelperText>{errors.lifeSupportAreas.message}</HelperText>}
		</div>
	);
};

export default Step5;
