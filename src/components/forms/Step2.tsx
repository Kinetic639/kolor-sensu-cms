"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { FormData } from "./schema";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

const moodDescriptions = [
	"Jestem osobą, która ma myśli samobójcze i nie widzi sensu życia.",
	"Jestem osobą czującą głęboką rozpacz i beznadzieję, trudno mi wstać z łóżka.",
	"Jestem osobą z silnym poczuciem przygnębienia, nie widzę wyjścia z trudnej sytuacji.",
	"Jestem osobą odczuwającą smutek i zniechęcenie, brak mi energii do codziennych czynności.",
	"Jestem osobą przygnębioną, ale funkcjonującą minimalnie w codziennych obowiązkach.",
	"Jestem osobą czującą się neutralnie, ani dobrze, ani tragicznie, moje emocje są stłumione.",
	"Jestem osobą, której stan się poprawia, mam przebłyski lepszego samopoczucia, ale nadal czuję wewnętrzny ciężar.",
	"Jestem osobą, która czuje się w miarę dobrze, potrafię cieszyć się niektórymi chwilami, choć czasem bywa ciężko.",
	"Jestem osobą, która czuje się dobrze, z pozytywnym nastawieniem do codziennego życia.",
	"Jestem osobą zadowoloną, czuję radość i spokój, większość rzeczy układa się po mojej myśli.",
	"Jestem osobą szczęśliwą, czuję pełnię życia, harmonię i satysfakcję z codziennych działań.",
];

const Step2: React.FC = () => {
	const {
		formState: { errors },
		setValue,
		control,
		trigger,
	} = useFormContext<FormData>();
	const selectedMood = useWatch({ control, name: "moodRating", defaultValue: 5 });
	const name = useWatch({ control, name: "name" });

	const handleRadioChange = async (value: number) => {
		setValue("moodRating", value, { shouldValidate: true });
		await trigger("moodRating");
	};

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				{name}, jak oceniasz swoje samopoczucie?
			</Typography>

			{/* Mood rating scale as radio buttons */}
			<div className="mt-12 flex flex-col items-center">
				<div className="relative flex w-full max-w-xl justify-between">
					{Array.from({ length: 11 }, (_, i) => (
						<label
							key={i}
							className={`flex cursor-pointer flex-col items-center rounded-full border-2 border-transparent pt-0.5 transition-colors hover:border-gray-500 ${
								selectedMood === i ? "bg-[#2e4554] text-white" : "text-gray-600"
							}`}
							style={{
								width: 40,
								height: 40,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<input
								type="radio"
								value={i}
								checked={selectedMood === i}
								onChange={() => handleRadioChange(i)}
								className="hidden"
							/>
							<span>{i}</span>
						</label>
					))}
				</div>

				{/* Description of the selected mood */}
				{selectedMood !== null && (
					<p className="mt-10 text-center text-lg">{moodDescriptions[selectedMood]}</p>
				)}
			</div>

			{/* Error message */}
			{errors.moodRating?.message && (
				<p className="mt-2 text-sm text-red-600">{errors.moodRating.message}</p>
			)}

			{/* Special case for mood 0 */}
			{selectedMood === 0 && (
				<div className="mx-auto mt-12 flex max-w-screen-sm flex-col gap-6 rounded-lg p-8 text-center text-xl">
					<p>
						Wygląda na to, że przechodzisz teraz przez bardzo trudny czas. Nie musisz zmagać się z
						tym samodzielnie.
					</p>
					<p className="text-center font-medium">
						Prosimy, skontaktuj się z infolinią wsparcia lub skorzystaj z czatu 24/7, gdzie możesz
						porozmawiać w tym momencie o swoich trudnościach.
					</p>
					<div>
						<p className="text-center">
							<strong>Infolinia wsparcia:</strong> 800 702 222
						</p>
						<a href="https://www.mental.org.pl" target="_blank" className="underline">
							Skorzystaj z czatu
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default Step2;
