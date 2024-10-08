"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FormDataSchema } from "./schema";
import { Progress } from "@/components/ui/progress";

type FieldName = keyof Inputs;
type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
	{
		id: "Step 1",
		name: "Your Name",
		fields: ["firstName", "lastName"],
	},
	{
		id: "Step 2",
		name: "Consultation For",
		fields: ["consultationFor"],
	},
	{
		id: "Step 3",
		name: "Details for You",
		fields: ["email", "phone"],
	},
	{
		id: "Step 4",
		name: "Details for Child",
		fields: ["childName", "childAge"],
	},
	{
		id: "Step 5",
		name: "Details for Couples",
		fields: ["partnerName", "relationshipDuration"],
	},
];

export function ConsultationTestForm() {
	const [previousStep, setPreviousStep] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const [consultationType, setConsultationType] = useState<"me" | "child" | "couple" | null>(null);
	const delta = currentStep - previousStep;

	const {
		register,
		handleSubmit,
		watch,
		reset,
		trigger,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(FormDataSchema),
	});

	const progressPercentage =
		((currentStep + 1) / (steps.length - 2 + (consultationType ? 1 : 0))) * 100;

	const processForm: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		reset();
	};

	const next = async () => {
		const fields = steps[currentStep].fields as FieldName[]; // Cast fields to FieldName[]
		const output = await trigger(fields, { shouldFocus: true });

		if (!output) return;

		if (currentStep === 1) {
			const consultationFor = watch("consultationFor");
			setConsultationType(consultationFor);
		}

		if (currentStep < steps.length - 1) {
			setPreviousStep(currentStep);
			setCurrentStep((step) => step + 1);
		}
	};

	const prev = () => {
		if (currentStep > 0) {
			setPreviousStep(currentStep);
			setCurrentStep((step) => step - 1);
		}
	};

	const renderStepFields = () => {
		if (currentStep === 0) {
			return (
				<>
					<label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
						First Name
					</label>
					<input id="firstName" {...register("firstName")} className="input" />
					{errors.firstName && <p>{errors.firstName.message}</p>}

					<label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
						Last Name
					</label>
					<input id="lastName" {...register("lastName")} className="input" />
					{errors.lastName && <p>{errors.lastName.message}</p>}
				</>
			);
		}

		if (currentStep === 1) {
			return (
				<>
					<label className="block text-sm font-medium leading-6 text-gray-900">
						Consultation For:
					</label>
					<div>
						<label>
							<input type="radio" value="me" {...register("consultationFor")} /> For Me
						</label>
						<label>
							<input type="radio" value="child" {...register("consultationFor")} /> For My Child
						</label>
						<label>
							<input type="radio" value="couple" {...register("consultationFor")} /> For Couples
						</label>
					</div>
					{errors.consultationFor && <p>{errors.consultationFor.message}</p>}
				</>
			);
		}

		if (consultationType === "me") {
			return (
				<>
					<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
						Email
					</label>
					<input id="email" {...register("email")} className="input" />
					{errors.email && <p>{errors.email.message}</p>}

					<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
						Phone
					</label>
					<input id="phone" {...register("phone")} className="input" />
					{errors.phone && <p>{errors.phone.message}</p>}
				</>
			);
		}

		if (consultationType === "child") {
			return (
				<>
					<label htmlFor="childName" className="block text-sm font-medium leading-6 text-gray-900">
						Imię dziecka
					</label>
					<input id="childName" {...register("childName")} className="input" />
					{errors.childName && <p>{errors.childName.message}</p>}

					<label htmlFor="childAge" className="block text-sm font-medium leading-6 text-gray-900">
						Wiek dziecka
					</label>
					<input id="childAge" {...register("childAge")} className="input" />
					{errors.childAge && <p>{errors.childAge.message}</p>}
				</>
			);
		}

		if (consultationType === "couple") {
			return (
				<>
					<label htmlFor="partnerName" className="block text-sm font-medium"></label>
					<input id="partnerName" {...register("partnerName")} className="input" />
					{errors.partnerName && <p>{errors.partnerName.message}</p>}

					<label
						htmlFor="relationshipDuration"
						className="block text-sm font-medium leading-6 text-gray-900"
					>
						Relationship Duration
					</label>
					<input
						id="relationshipDuration"
						{...register("relationshipDuration")}
						className="input"
					/>
					{errors.relationshipDuration && <p>{errors.relationshipDuration.message}</p>}
				</>
			);
		}

		return null;
	};

	return (
		<section className="flex flex-col justify-between">
			<Progress value={progressPercentage} />

			{/* Form */}
			<form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
				<motion.div
					initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					{renderStepFields()}
				</motion.div>
			</form>

			{/* Navigation */}
			<div className="mt-8 pt-5">
				<div className="flex justify-between">
					<button
						type="button"
						onClick={prev}
						disabled={currentStep === 0}
						className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
						</svg>
					</button>
					<button
						type="button"
						onClick={next}
						disabled={currentStep === steps.length - 1}
						className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
}
