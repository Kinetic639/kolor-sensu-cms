import React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/app/ui/Header";
import { AppWrapper } from "@/app/ui/AppWrapper";
import { cn } from "@/lib/utils";

import "./globals.css";
import VisualEditingControls from "@/app/ui/VisualEditingControls";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import Footer from "@/app/ui/footer";
export const metadata: Metadata = {
	icons: {
		icon: `https://fav.farm/🖤`,
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={cn("relative overflow-auto overflow-y-scroll")}
			suppressHydrationWarning
		>
			<body className="flex min-h-screen flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<AppWrapper>
						<Header />
						<main id="main-content" tabIndex={-1} className="flex-1 overflow-hidden px-4 md:px-0">
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
