"use client";
import React, { type FC, useId, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface FormValues {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	message?: string;
}

export const ContactForm: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		mode: "onTouched",
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			setIsLoading(true);

			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setIsSuccess(true);
				setIsSubmitSuccessful(true);
				reset();
				console.log("Email sent successfully!");
			} else {
				setIsSuccess(false);
				setIsSubmitSuccessful(true);
				console.error("Failed to send email");
			}
		} catch (error) {
			setIsSuccess(false);
			setIsSubmitSuccessful(true);
			console.error("Failed to send email:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const onCancel = () => {
		reset();
		setIsSubmitSuccessful(false);
		setIsSuccess(false);
	};

	const handleRetry = () => {
		setIsSubmitSuccessful(false);
	};

	const handleNewQuestion = () => {
		reset();
		setIsSubmitSuccessful(false);
		setIsSuccess(false);
	};

	const email = useId();
	const firstNameId = useId();
	const lastNameId = useId();
	const messageId = useId();

	return (
		<div className="flex h-full flex-1 flex-col items-center gap-6 rounded-3xl border-2 border-purple-400 bg-purple-200 bg-opacity-30 p-6">
			<h4 className="w-full text-center text-[24px] font-bold leading-[48px]">
				Formularz kontaktowy
			</h4>
			{!isSubmitSuccessful && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex w-full flex-col items-stretch gap-6 px-0 md:gap-12"
				>
					{/* First Name */}
					<div className="w-full">
						<label htmlFor={firstNameId} className="block text-sm font-medium">
							Imię
						</label>
						<input
							id={firstNameId}
							type="text"
							className="input w-full"
							{...register("firstName", { required: "First Name is required" })}
						/>
						{errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
					</div>

					{/* Last Name */}
					<div>
						<label htmlFor={lastNameId} className="block text-sm font-medium">
							Nazwisko
						</label>
						<input
							id={lastNameId}
							type="text"
							className="input w-full"
							{...register("lastName", { required: "Last Name is required" })}
						/>
						{errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
					</div>

					{/* Email */}
					<div>
						<label htmlFor={email} className="block text-sm font-medium">
							Email
						</label>
						<input
							id={email}
							type="email"
							className="input w-full"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Invalid email address",
								},
							})}
						/>
						{errors.email && <span className="text-red-500">{errors.email.message}</span>}
					</div>

					{/* Message */}
					<div>
						<label htmlFor={messageId} className="block text-sm font-medium">
							Wiadomość
						</label>
						<textarea id={messageId} rows={4} className="input w-full" {...register("message")} />
					</div>

					{/* Buttons */}
					<div className="flex flex-col justify-between gap-4">
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Wysyłanie..." : "Wyślij"}
						</Button>
						<Button type="button" variant="secondary" onClick={onCancel}>
							Wyczyść
						</Button>
					</div>
				</form>
			)}
			{isSubmitSuccessful && isSuccess && (
				<>
					<div className="flex flex-col items-center justify-center gap-6 rounded-md py-6 text-center text-white">
						<div>
							<svg
								width="100"
								height="100"
								className="text-green-300"
								viewBox="0 0 100 100"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M26.6666 50L46.6666 66.6667L73.3333 33.3333M50 96.6667C43.8716 96.6667 37.8033 95.4596 32.1414 93.1144C26.4796 90.7692 21.3351 87.3317 17.0017 82.9983C12.6683 78.6649 9.23082 73.5204 6.8856 67.8586C4.54038 62.1967 3.33331 56.1283 3.33331 50C3.33331 43.8716 4.54038 37.8033 6.8856 32.1414C9.23082 26.4796 12.6683 21.3351 17.0017 17.0017C21.3351 12.6683 26.4796 9.23084 32.1414 6.88562C37.8033 4.5404 43.8716 3.33333 50 3.33333C62.3767 3.33333 74.2466 8.24998 82.9983 17.0017C91.75 25.7534 96.6666 37.6232 96.6666 50C96.6666 62.3768 91.75 74.2466 82.9983 82.9983C74.2466 91.75 62.3767 96.6667 50 96.6667Z"
									stroke="currentColor"
									strokeWidth="3"
								/>
							</svg>
							<h3 className="py-5 text-2xl text-green-500">Sukces!</h3>
						</div>
						<div>
							<p className="text-gray-700 md:px-3">Twoje pytanie zostało wysłane.</p>
							<p className="text-gray-700 md:px-3"> Postaramy się odpowiedzieć jak najszybciej.</p>
						</div>
						<div className="flex w-full flex-col items-center gap-4 py-4">
							<Button className="w-full" onClick={handleNewQuestion}>
								Zadaj inne pytanie
							</Button>
							<Button className="w-full" variant="secondary">
								<Link href={`/`}>strona główna </Link>
							</Button>
						</div>
					</div>
				</>
			)}

			{isSubmitSuccessful && !isSuccess && (
				<div className="flex flex-col items-center justify-center rounded-md text-center text-white">
					<div className="flex flex-col items-center px-4 py-6">
						<svg
							width="97"
							height="97"
							viewBox="0 0 97 97"
							className="text-red-400"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M27.9995 69C43.6205 53.379 52.3786 44.621 67.9995 29M26.8077 29L67.9995 69M48.2189 95C42.0906 95 36.0222 93.7929 30.3604 91.4477C24.6985 89.1025 19.554 85.6651 15.2206 81.3316C10.8872 76.9982 7.44975 71.8538 5.10454 66.1919C2.75932 60.53 1.55225 54.4617 1.55225 48.3333C1.55225 42.205 2.75932 36.1366 5.10454 30.4748C7.44975 24.8129 10.8872 19.6684 15.2206 15.335C19.554 11.0016 24.6985 7.56418 30.3604 5.21896C36.0222 2.87374 42.0906 1.66667 48.2189 1.66667C60.5957 1.66667 72.4655 6.58333 81.2172 15.335C89.9689 24.0867 94.8856 35.9566 94.8856 48.3333C94.8856 60.7101 89.9689 72.58 81.2172 81.3316C72.4655 90.0833 60.5957 95 48.2189 95Z"
								stroke="CurrentColor"
								strokeWidth="3"
							/>
						</svg>
						<h3 className="py-5 text-2xl text-red-500">Coś poszło nie tak, spróbuj ponownie...</h3>
					</div>

					<Button className="w-full" onClick={handleRetry}>
						Spróbuj ponownie
					</Button>
				</div>
			)}
		</div>
	);
};
