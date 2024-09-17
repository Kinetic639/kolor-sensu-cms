"use client";
import { useEffect } from "react";
import SpecialistCard from "@/app/ui/molecules/SpecialistCard";

declare global {
	interface Window {
		bookero_config: {
			id: string;
			container: string;
			type: string;
			position: string;
			plugin_css: boolean;
			lang: string;
		};
	}
}

export default function SpecialistsSection({ specialists }: { specialists: Sanity.Specialist[] }) {
	useEffect(() => {
		// Safely set the bookero_config property
		window.bookero_config = {
			id: "pHrfGGnHWDTF",
			container: "bookero",
			type: "calendar",
			position: "",
			plugin_css: true,
			lang: "pl",
		};

		const script = document.createElement("script");
		script.src = "https://cdn.bookero.pl/plugin/v2/js/bookero-compiled.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	if (!specialists) return null;

	return (
		<section className="specialists-module px-1 pb-12 md:px-0">
			<div className="mx-auto flex max-w-screen-xl flex-col gap-12 px-0 md:px-4">
				{specialists.map((specialist) => (
					<SpecialistCard key={specialist._id} specialist={specialist} />
				))}
			</div>
		</section>
	);
}
