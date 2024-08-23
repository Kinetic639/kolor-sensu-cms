import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				ink: "#000",
				canvas: "#fff",

				accent: "#000",
			},
			maxHeight: {
				fold: "calc(100svh - var(--header-height))",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
	],
	safelist: [{ pattern: /action.*/ }, "ghost"],
};
// eslint-disable-next-line import/no-default-export
export default config;
