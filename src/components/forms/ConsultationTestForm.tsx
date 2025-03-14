"use client";
import React, { useState, createElement, useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FormDataSchema, type FormData } from "./schema";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "@/components/forms/Step9";
import { Progress } from "@/components/ui/progress";
import { usePageScrolled } from "@/lib/hooks/usePageScrolled";
import Step0 from "@/components/forms/Step0";
import { cn } from "@/lib/utils";
import { AnimatedLottie } from "@/components/AnimatedLottie/AnimatedLottie";
import { emailSent } from "@/components/animations";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

const steps = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9]; // Adding Step9

type FieldNames =
	| "step0"
	| "name"
	| "moodRating"
	| "meetingType"
	| "emotionalDifficulties"
	| "lifeSupportAreas"
	| "helpfulSupport"
	| "neurodiversityDiagnosis"
	| "neurodiversityNeeds"
	| "email"
	| "agreement"
	| "phone";

const stepFields: FieldNames[][] = [
	["step0"],
	["name"],
	["moodRating"],
	["meetingType"],
	["emotionalDifficulties"],
	["lifeSupportAreas"],
	["helpfulSupport"],
	["neurodiversityDiagnosis"],
	["neurodiversityNeeds"],
	["email"],
	["agreement"],
	["phone"],
];

const ConsultationTestForm: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [skippedStep8, setSkippedStep8] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const isPageScrolled = usePageScrolled();
	const methods = useForm<FormData>({
		resolver: zodResolver(FormDataSchema),
		mode: "onTouched",
		defaultValues: {
			neurodiversityDiagnosis: "",
		},
	});
	const moodRating = useWatch({
		control: methods.control,
		name: "moodRating",
	});
	const progressPercentage = ((currentStep + 1) / steps.length) * 100;

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [currentStep]);

	const goToSummary = () => {
		setSkippedStep8(true);
		setCurrentStep(steps.length - 1);
	};

	const nextStep = async () => {
		const isValid = await methods.trigger(stepFields[currentStep]);

		if (currentStep === 7) {
			const diagnosis = methods.getValues("neurodiversityDiagnosis");
			if (diagnosis === "3" || diagnosis === "4") {
				goToSummary();
				return;
			} else {
				setSkippedStep8(false); // If not skipping, reset this flag
			}
		}

		if (isValid && currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
		if (isValid && isPageScrolled) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const prevStep = () => {
		if (currentStep === 9 && skippedStep8) {
			// If you're in Step 9 and Step 8 was skipped, go back to Step 7
			setCurrentStep(7);
		} else if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}

		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const onSubmit = async (data: FormData) => {
		try {
			const response = await fetch("/api/test-result", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setIsSuccess(true);
				console.log("Email sent successfully");
			} else {
				setIsSuccess(false);
				console.error("Failed to send email");
			}
		} catch (error) {
			setIsSuccess(false);
			console.error("Error sending email:", error);
		} finally {
		}
	};

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLFormElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			await nextStep();
		}
	};

	return (
		<div className="mx-auto flex w-full max-w-screen-lg flex-col gap-10 rounded-2xl bg-[#D8DCCFFF] p-10 px-4 shadow-md">
			{currentStep !== 0 && !isSuccess && <Progress value={progressPercentage} />}
			<FormProvider {...methods}>
				{!isSuccess ? (
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						onKeyDown={handleKeyDown}
						className="flex flex-col items-stretch"
					>
						<AnimatePresence mode="wait">
							<motion.div
								className="flex-1"
								key={currentStep}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.5 }}
							>
								{createElement(steps[currentStep])}
							</motion.div>
						</AnimatePresence>
						{moodRating !== 0 && (
							<div
								className={cn(
									"flex flex-col-reverse items-center gap-4 md:flex-row md:items-start",
									currentStep > 1 ? "justify-between" : "justify-center",
									currentStep === 9 ? "mt-4" : "mt-8",
								)}
							>
								{currentStep > 1 && moodRating !== 0 && (
									<button
										type="button"
										onClick={prevStep}
										className="group relative w-full max-w-[200px] rounded-full border border-gray-500 bg-transparent px-6 py-3 text-gray-500 transition-colors duration-300 hover:border-[#2e4554] hover:text-[#2e4554] disabled:opacity-50"
									>
										<span className="flex items-center justify-center space-x-2">
											<svg
												className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15 19l-7-7 7-7"
												/>
											</svg>
											<span>Wstecz</span>
										</span>
									</button>
								)}

								{currentStep !== steps.length - 1 && moodRating !== 0 && (
									<button
										type="button"
										onClick={nextStep}
										disabled={moodRating === 0}
										className={cn(
											"w-full rounded-full border border-transparent bg-[#2e4554] px-6 py-3 text-white transition-all duration-150 hover:bg-background-secondary disabled:bg-gray-600 disabled:opacity-30",
											currentStep === 0 ? "max-w-[250px]" : "max-w-[200px]",
										)}
									>
										{currentStep === 0 ? "Rozpocznij test (8 min)" : "Kontynuuj"}
									</button>
								)}

								{currentStep > 1 && (
									<div className="order-first mt-5 w-full text-center md:order-none md:mt-0 md:max-w-[300px] md:text-right">
										Linia wsparcia dla osób w stanie kryzysu psychicznego:{" "}
										<a href="tel:800702222" className="font-medium">
											800 702 222
										</a>
									</div>
								)}
							</div>
						)}
					</form>
				) : (
					<div className="flex flex-col items-center gap-6 pb-6 text-center text-gray-800">
						<div className="text-blue-500">
							<AnimatedLottie
								className="mx-auto mb-8 mt-6 flex h-fit max-h-32 min-h-[300px] items-center"
								animationData={emailSent}
							/>
						</div>
						<h3 className="text-2xl font-bold text-foreground">Test został przesłany!</h3>
						<Typography variant="body1" as="p" className="max-w-lg text-center text-foreground">
							Otrzymaliśmy Twoje odpowiedzi i są już w rękach naszego specjalisty. Wkrótce
							skontaktujemy się z Tobą, aby omówić wyniki i zaproponować najlepszą ścieżkę dalszej
							konsultacji.
						</Typography>
						<div className="mt-8 flex flex-col gap-4">
							<Link href={"/"} className={cn("max-md:mx-auto")}>
								<button
									type="button"
									onClick={nextStep}
									disabled={moodRating === 0}
									className={cn(
										"w-full rounded-full border border-transparent bg-[#2e4554] px-8 py-3 text-white transition-all duration-150 hover:bg-background-secondary disabled:bg-gray-600 disabled:opacity-30",
									)}
								>
									Strona Główna
								</button>
							</Link>
						</div>
					</div>
				)}
			</FormProvider>
		</div>
	);
};

export default ConsultationTestForm;
