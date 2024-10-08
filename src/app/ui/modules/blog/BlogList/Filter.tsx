"use client";

import { useEffect } from "react";
import { categoryStore } from "../store";
import Category from "../Category";
import css from "./Filtering.module.css";
import { cn } from "@/lib/utils";

export default function Filter({
	label,
	value = "All",
}: {
	label: string;
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	value?: "All" | string;
}) {
	const { selected, setSelected, reset } = categoryStore();

	useEffect(reset, [reset]);

	return (
		<button
			className={cn(
				css.filter,
				"!py-1",
				selected === value ? "action *:text-white/50" : "ghost border border-transparent",
			)}
			onClick={() => setSelected(value)}
		>
			<Category label={label} />
		</button>
	);
}
