import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Montserrat } from "next/font/google";
import { Header } from "@/app/ui/Header";
import { AppWrapper } from "@/app/ui/AppWrapper";
import { cn } from "@/lib/utils";

import "./globals.css";
import VisualEditingControls from "@/app/ui/VisualEditingControls";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Footer from "@/app/ui/footer";
import Announcement from "@/app/ui/Announcement";
export const metadata: Metadata = {
	icons: {
		icon: `https://fav.farm/🖤`,
	},
};
const inter = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={cn("relative overflow-auto overflow-x-hidden overflow-y-scroll")}
			suppressHydrationWarning
		>
			<body className={cn("flex min-h-screen flex-col", inter.className)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<AppWrapper>
						<Announcement />
						<Header />
						<main id="main-content" tabIndex={-1} className="flex-1">
							{children}
						</main>
						<Footer />
					</AppWrapper>
					<Analytics />
					<SpeedInsights />
					<VisualEditingControls />
				</ThemeProvider>
			</body>
		</html>
	);
}
