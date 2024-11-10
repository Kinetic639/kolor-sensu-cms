"use client";

import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Link from "next/link";
import type { FormData } from "./schema";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

// Define mood descriptions
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

// Map mood values to text emojis
const moodEmojis = [
	"🫥", // 0 - Very low
	"😰", // 1 - Deep sadness
	"😩", // 2 - Feeling down
	"😔", // 3 - Disappointed
	"😕", // 4 - Sad
	"😶", // 5 - Neutral
	"🙂", // 6 - Slight smile
	"😊", // 7 - Feeling good
	"😄", // 8 - Happy
	"😁", // 9 - Happy
	"🥳", // 10 - Celebratory
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

	// Ref for the scrollable container
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleRadioChange = async (value: number) => {
		setValue("moodRating", value, { shouldValidate: true });
		await trigger("moodRating");
	};

	// Scroll to the selected mood (centered on 5) on component mount
	useEffect(() => {
		if (scrollContainerRef.current) {
			// Calculate the offset to scroll to the middle mood (5)
			const scrollToPosition =
				(scrollContainerRef.current.scrollWidth / 11) * 5 -
				scrollContainerRef.current.clientWidth / 2;
			scrollContainerRef.current.scrollTo({
				left: scrollToPosition,
				behavior: "smooth",
			});
		}
	}, []);

	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				{name}, jak oceniasz swoje samopoczucie?
			</Typography>

			{/* Selected emoji display */}
			<div className="mb-2 mt-10 flex justify-center text-8xl">
				<span>{moodEmojis[selectedMood]}</span>
			</div>

			{/* Mood rating scale as a scrollable carousel */}
			<div className="mt-8 flex flex-col items-center">
				{/* Scrollable container with a ref */}
				<div
					ref={scrollContainerRef}
					className="relative flex w-full max-w-screen-md space-x-4 overflow-x-auto px-2 py-4 md:justify-between"
				>
					{Array.from({ length: 11 }, (_, i) => (
						<label
							key={i}
							className={`flex cursor-pointer flex-col items-center justify-center rounded-full border-2 border-transparent transition-colors hover:border-gray-500 ${
								selectedMood === i ? "bg-[#2e4554] text-white" : "bg-gray-200 text-gray-600"
							}`}
							style={{
								width: 50,
								height: 50,
								minWidth: 50,
								minHeight: 50,
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
					<p className="mt-12 text-center text-lg md:px-4">{moodDescriptions[selectedMood]}</p>
				)}
			</div>

			{/* Error message */}
			{errors.moodRating?.message && (
				<p className="mt-2 text-sm text-red-600">{errors.moodRating.message}</p>
			)}

			{/* Special case for mood 0 */}
			{selectedMood === 0 && (
				<div className="mx-auto mt-12 flex max-w-screen-sm flex-col gap-10 rounded-lg py-6 text-center text-xl">
					<p>
						Wygląda na to, że przechodzisz teraz przez bardzo trudny czas. Nie musisz zmagać się z
						tym samodzielnie.
					</p>
					<p className="text-center font-medium">
						Prosimy, skontaktuj się z infolinią wsparcia lub skorzystaj z czatu 24/7, gdzie możesz
						porozmawiać w tym momencie o swoich trudnościach.
					</p>
					<div className="flex flex-col text-center text-3xl leading-snug md:text-4xl">
						<span className="font-semibold">Infolinia wsparcia:</span>{" "}
						<Link href={`tel:800 702 222`}>800 702 222</Link>
					</div>
					<Link
						href="https://www.mental.org.pl"
						target="_blank"
						className="mx-auto rounded-full bg-foreground p-4 px-8 text-lg text-background transition duration-300 ease-in-out hover:bg-background-secondary hover:text-background"
					>
						Skorzystaj z czatu
					</Link>
				</div>
			)}
		</div>
	);
};

export default Step2;
