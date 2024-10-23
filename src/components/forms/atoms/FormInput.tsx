import React from "react";
import {
	type FieldError,
	type FieldErrorsImpl,
	type Merge,
	type UseFormRegisterReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import HelperText from "@/components/forms/atoms/HelperText";

interface FormInputProps {
	id: string;
	label?: string;
	placeholder: string;
	error?: FieldError | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>;
	register: UseFormRegisterReturn;
	className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
	id,
	className,
	label,
	placeholder,
	error,
	register,
}) => (
	<div className="mb-4">
		{label && (
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
		)}
		<input
			id={id}
			className={cn(
				"mt-1 block w-full rounded-full border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-0 sm:text-lg",
				className,
			)}
			placeholder={placeholder}
			{...register}
		/>

		{error && typeof error.message === "string" && <HelperText>{error.message}</HelperText>}
	</div>
);

export default FormInput;
