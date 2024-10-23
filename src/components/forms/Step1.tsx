"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "@/components/forms/atoms/FormInput";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

const Step1: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="min-h-[300px]">
			<Typography as="p" variant="h4" className="mb-8 text-center">
				Jak do Ciebie mówić?
			</Typography>
			<FormInput
				id="name"
				placeholder="Imię Twojej Osoby"
				register={register("name")}
				error={errors.name}
				className="focus:ring-none mx-auto max-w-sm text-center focus:border-none"
			/>
		</div>
	);
};

export default Step1;
