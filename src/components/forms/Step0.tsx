import React from "react";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

const Step0 = () => {
	return (
		<div className="flex flex-col items-center px-4 py-6">
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
			<div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
				{/* Card 1 */}
				<div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
					<div className="mb-4 h-24 w-24 rounded-full bg-gray-200">Tu będzie grafika</div>
					<Typography as="h3" variant="h6" className="font-bold">
						Skuteczność
					</Typography>
					<p className="mt-2">
						Dobranie odpowiedniego specjalisty na podstawie twoich potrzeb. Zwiększa szansę na
						efektywne wsparcie.
					</p>
				</div>

				{/* Card 2 */}
				<div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
					<div className="mb-4 h-24 w-24 rounded-full bg-gray-200">Druga grafika</div>
					<Typography as="h3" variant="h6" className="font-bold">
						Poufność
					</Typography>
					<p className="mt-2">
						Gwarantujemy pełną poufność zgodnie z Kodeksem Etyki Psychologicznej, zapewniając
						najwyższe standardy bezpieczeństwa i zaufania w kontakcie z naszymi specjalistami.
					</p>
				</div>

				{/* Card 3 */}
				<div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
					<div className="mb-4 h-24 w-24 rounded-full bg-gray-200">Trzecia grafika</div>
					<Typography as="h3" variant="h6" className="font-bold">
						Czas
					</Typography>
					<p className="mt-2">
						Test pomoże dopasować specjalistę i jest pierwszym etapem konsultacji, który pomoże
						zaoszczędzić czas i będzie krokiem ku zmianie.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Step0;
