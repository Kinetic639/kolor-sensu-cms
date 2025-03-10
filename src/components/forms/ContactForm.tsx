"use client";
import React, { type FC, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AnimatedLottie } from "@/components/AnimatedLottie/AnimatedLottie";
import { emailSent } from "@/components/animations";

export interface FormValues {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	message?: string;
	consent: boolean;
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
			phone: "",
			message: "",
			consent: false,
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
			} else {
				setIsSuccess(false);
				setIsSubmitSuccessful(true);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			setIsSuccess(false);
			setIsSubmitSuccessful(true);
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
	const phoneId = useId();
	const messageId = useId();

	return (
		<div className="flex h-full flex-1 flex-col items-center gap-6 rounded-3xl border border-[#1C68A7] bg-[#cdd7f7] bg-opacity-60 p-8 shadow-lg md:p-12">
			<h4 className="w-full text-center text-xl font-semibold text-[#1C68A7] md:text-2xl">
				Formularz kontaktowy
			</h4>

			{!isSubmitSuccessful && (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex w-full flex-col items-stretch gap-6"
				>
					{/* Input Fields */}
					{[
						{
							id: firstNameId,
							label: "Imię",
							name: "firstName",
							type: "text",
							placeholder: "Imię",
						},
						{
							id: lastNameId,
							label: "Nazwisko",
							name: "lastName",
							type: "text",
							placeholder: "Nazwisko",
						},
						{
							id: email,
							label: "Email",
							name: "email",
							type: "email",
							placeholder: "Email",
						},
						{
							id: phoneId,
							label: "Telefon",
							name: "phone",
							type: "tel",
							placeholder: "Nr telefonu",
						},
					].map(({ id, label, name, type, placeholder }) => (
						<div key={id}>
							<label htmlFor={id} className="block text-sm font-medium text-[#1C68A7]">
								{label}
							</label>
							<input
								id={id}
								type={type}
								placeholder={placeholder}
								className="my-1 w-full rounded-lg border border-[#b0d9fa] p-3 text-[#1C68A7] placeholder-[#b0d9fa] focus:border-sky-600 focus:bg-[#f6fbff] focus:outline-sky-700 focus:ring-1 focus:ring-sky-500"
								{...register(name as keyof FormValues, {
									required: `${label} jest wymagane`,
									pattern:
										name === "email"
											? { value: /^\S+@\S+$/i, message: "Nieprawidłowy adres email" }
											: name === "phone"
												? { value: /^[0-9+\s]*$/, message: "Nieprawidłowy numer telefonu" }
												: undefined,
								})}
							/>
							{errors[name as keyof FormValues] && (
								<span className="text-sm text-red-500">
									{errors[name as keyof FormValues]?.message}
								</span>
							)}
						</div>
					))}

					{/* Message */}
					<div>
						<label htmlFor={messageId} className="block text-sm font-medium text-[#1C68A7]">
							Wiadomość
						</label>
						<textarea
							id={messageId}
							rows={4}
							placeholder="Twoja wiadomość"
							className="mt-1 w-full rounded-lg border border-[#b0d9fa] p-3 text-[#1C68A7] placeholder-[#b0d9fa] focus:border-sky-600 focus:bg-[#f6fbff] focus:outline-sky-700 focus:ring-1 focus:ring-sky-500"
							{...register("message")}
						/>
					</div>

					{/* Consent */}
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="consent"
							className="h-5 w-5 rounded border-[#b0d9fa] text-[#1C68A7] focus:ring-0"
							{...register("consent", { required: "Musisz zaakceptować zgodę na kontakt" })}
						/>
						<label htmlFor="consent" className="text-sm text-[#1C68A7]">
							Zgadzam się na przetwarzanie moich danych osobowych w celu kontaktu
						</label>
					</div>
					{errors.consent && <span className="text-sm text-red-500">{errors.consent.message}</span>}

					{/* Buttons */}
					<div className="mt-4 flex w-full flex-col gap-6 md:flex-row md:gap-4">
						<Button
							type="submit"
							disabled={isLoading}
							className="w-full rounded-full bg-[#1C68A7] py-6 text-base hover:bg-[#225783]"
						>
							{isLoading ? "Wysyłanie..." : "Wyślij"}
						</Button>
						<Button
							type="button"
							variant="secondary"
							onClick={onCancel}
							className="w-full rounded-full border border-[#1C68A7] py-6 text-base text-[#1C68A7] transition-colors duration-150 hover:bg-[#afd4f2]"
						>
							Wyczyść
						</Button>
					</div>
				</form>
			)}

			{/* Success & Error Messages */}
			{isSubmitSuccessful && isSuccess && (
				<div className="flex flex-col items-center gap-4 text-center text-[#1C68A7]">
					<AnimatedLottie className="aspect-square" animationData={emailSent} />
					<h3 className="text-xl font-semibold text-green-600">Dziękujemy!</h3>
					<p className="text-[#1C68A7]">
						Twoja wiadomość została wysłana. Odezwiemy się jak najszybciej.
					</p>
					<Button onClick={handleNewQuestion} className="mt-4 w-full bg-sky-600 hover:bg-sky-700">
						Zadaj kolejne pytanie
					</Button>
				</div>
			)}

			{isSubmitSuccessful && !isSuccess && (
				<div className="flex flex-col items-center gap-4 text-center text-[#1C68A7]">
					<div className="text-red-500">
						<svg
							width="60"
							height="60"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-7h2v2h-2zm0-4h2v2h-2z" />
						</svg>
					</div>
					<h3 className="text-xl font-semibold text-red-500">Coś poszło nie tak...</h3>
					<p className="text-[#1C68A7]">Wystąpił błąd podczas wysyłania. Spróbuj ponownie.</p>
					<Button onClick={handleRetry} className="w-full bg-sky-600 hover:bg-sky-700">
						Spróbuj ponownie
					</Button>
				</div>
			)}
		</div>
	);
};
