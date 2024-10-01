import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			fontSize: {
				// Desktop font sizes
				"desktop-h1": ["68.66px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-h2": ["54.93px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-h3": ["43.95px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-h4": ["35.16px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-h5": ["28.13px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-h6": ["22.5px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-p": ["18px", { lineHeight: "1.4", fontWeight: "500" }],
				"desktop-small": ["14.4px", { lineHeight: "1.4", fontWeight: "500" }],

				// Mobile font sizes
				"mobile-h1": ["50.75px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-h2": ["44.79px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-h3": ["37.32px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-h4": ["31.1px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-h5": ["25.92px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-h6": ["21.6px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-p": ["18px", { lineHeight: "1.4", fontWeight: "500" }],
				"mobile-small": ["15px", { lineHeight: "1.4", fontWeight: "500" }],
			},
			fontFamily: {
				sans: ["var(--font-montserrat)", "sans-serif"],
				display: ["var(--font-rammetto)", "cursive"],
				josefin: ["var(--font-josefin-sans)", "cursive"],
			},
			screens: {},
			colors: {
				ink: "#000",
				canvas: "#fff",
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				background: {
					DEFAULT: "hsl(var(--background))",
					secondary: "hsl(var(--background-secondary))",
				},
				foreground: {
					DEFAULT: "hsl(var(--foreground))",
					secondary: "hsl(var(--foreground-secondary))",
					hover: "hsl(var(--foreground-hover))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			maxHeight: {
				fold: "calc(100svh - var(--header-height))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
	safelist: [{ pattern: /action.*/ }, "ghost"],
};

export default config;
