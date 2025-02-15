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
import { SmoothScrolling } from "@/app/ui/SmoothScrolling";
export const metadata: Metadata = {
	icons: {
		icon: "/favicon.png",
	},
};

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "800", "700"],
	variable: "--font-montserrat",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={cn("relative overflow-auto overflow-x-hidden overflow-y-scroll")}
			suppressHydrationWarning
		>
			<head>
				<link
					rel="icon"
					href="/favicon.png?<generated>"
					type="image/<generated>"
					sizes="<generated>"
				/>
				<title className="sr-only">Kolor Sensu - Centrum Wsparcia Psychologicznego</title>
			</head>
			<body className={cn("flex min-h-screen flex-col", montserrat.variable, "font-sans")}>
				<SmoothScrolling>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<AppWrapper>
							<Announcement />
							<Header />
							<main
								id="main-content"
								tabIndex={-1}
								className="flex-1 overflow-hidden pb-12 md:overflow-visible"
							>
								{children}
							</main>
							<Footer />
						</AppWrapper>
						<Analytics />
						<SpeedInsights />
						<VisualEditingControls />
					</ThemeProvider>
				</SmoothScrolling>
			</body>
		</html>
	);
}
