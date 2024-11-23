import React from "react";
import Image from "next/image";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

// Define card data in one place
const cardData = [
	{
		title: "Skuteczność",
		description:
			"Dobranie odpowiedniego specjalisty na podstawie twoich potrzeb. Zwiększa szansę na efektywne wsparcie.",
		imageSrc: "/icons/test-icons/accuracy.png",
		alt: "Ikona skuteczności",
	},
	{
		title: "Poufność",
		description:
			"Gwarantujemy pełną poufność zgodnie z Kodeksem Etyki Psychologicznej, zapewniając najwyższe standardy bezpieczeństwa i zaufania w kontakcie z naszymi specjalistami.",
		imageSrc: "/icons/test-icons/privacy.png",
		alt: "Ikona poufności",
	},
	{
		title: "Czas",
		description:
			"Test pomoże dopasować specjalistę i jest pierwszym etapem konsultacji, który pomoże zaoszczędzić czas i będzie krokiem ku zmianie.",
		imageSrc: "/icons/test-icons/clock.png",
		alt: "Ikona czasu",
	},
];

const Step0 = () => {
	return (
		<div className="flex flex-col items-center justify-between py-6">
			<div className="mb-6">
				<Typography as="p" variant="h5" className="mb-4 text-center">
					Zrób pierwszy krok do znalezienia Twojego koloru sensu
				</Typography>
				<Typography as="p" variant="body1" className="mb-8 px-8 text-center">
					Test pomoże dobrać dla Ciebie najlepszego specjalistę. Pozwoli też nam bliżej Ciebie
					poznać w trosce o najwyższej jakości usługi.
				</Typography>
			</div>
			{/* Card Container */}
			<div className="grid w-full max-w-[250px] grid-cols-1 gap-6 md:max-w-4xl md:grid-cols-3">
				{cardData.map((card, index) => (
					<div
						key={index}
						className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
					>
						<Image
							src={card.imageSrc}
							alt={card.alt}
							width={96}
							height={96}
							className="mb-4 h-28 w-28"
						/>
						<Typography as="h3" variant="h6" className="font-bold">
							{card.title}
						</Typography>
						<p className="mt-2">{card.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Step0;
