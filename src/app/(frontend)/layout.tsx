import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
	icons: {
		icon: `https://fav.farm/🖤`,
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className=" relative h-screen max-h-screen overflow-hidden border border-red-400">
			{/* <GoogleTagManager gtmId='' /> */}

			<body className="">
			text
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
