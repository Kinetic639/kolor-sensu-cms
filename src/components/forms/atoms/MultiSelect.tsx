"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface MultiSelectProps {
	options: string[];
	selectedOptions: string[];
	onSelect: (value: string[]) => void;
	layout?: "vertical" | "horizontal";
}

const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	selectedOptions,
	onSelect,
	layout = "vertical",
}) => {
	const toggleOption = (option: string) => {
		const isSelected = selectedOptions.includes(option);
		const updatedOptions = isSelected
			? selectedOptions.filter((o) => o !== option)
			: [...selectedOptions, option];
		onSelect(updatedOptions);
	};

	return (
		<div className="mt-10 flex justify-center">
			<div
				className={clsx(
					"inline-flex flex-wrap",
					layout === "vertical" ? "w-full max-w-screen-md flex-col gap-6" : "justify-center gap-4",
				)}
			>
				{options.map((option) => (
					<motion.div
						whileTap={{ scale: 0.95 }}
						key={option}
						className={clsx(
							"w-full cursor-pointer rounded-full border px-6 py-4 text-center transition-all duration-300 sm:w-auto",
							layout === "vertical" ? "text-left" : "text-center",
							selectedOptions.includes(option)
								? "bg-[#2e4554] text-white"
								: "border-gray-300 bg-white text-black",
						)}
						onClick={() => toggleOption(option)}
					>
						{option}
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default MultiSelect;
