"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import MultiSelect from "@/components/forms/atoms/MultiSelect";
import type { FormData } from "@/components/forms/schema";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import HelperText from "@/components/forms/atoms/HelperText"; // Importing the custom MultiSelect component

const Step6: React.FC = () => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<FormData>();
	const selectedSupportOptions = watch("helpfulSupport") || [];

	const handleSelect = (options: string[]) => {
		setValue("helpfulSupport", options, { shouldValidate: true });
	};

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				Jakie wsparcie byłoby dla Ciebie pomocne?
			</Typography>
			<MultiSelect
				options={[
					"Regularne spotkania terapeutyczne",
					"Wsparcie psychoedukacyjne (np. szkolenia, warsztaty)",
					"Grupy wsparcia",
					"Wsparcie w planowaniu i organizacji zadań",
					"Techniki zarządzania stresem",
					"Praktyczne narzędzia do pracy nad emocjami i relacjami",
					"Wsparcie diagnostyczne i konsultacje",
					"Nie wiem",
				]}
				selectedOptions={selectedSupportOptions}
				onSelect={handleSelect}
				layout="vertical"
			/>
			{errors.helpfulSupport && <HelperText>{errors.helpfulSupport.message}</HelperText>}
		</div>
	);
};

export default Step6;
