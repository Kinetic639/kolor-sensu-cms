/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument*/
import { defineArrayMember, defineField } from "sanity";
import { VscInspect } from "react-icons/vsc";
import { count } from "@sanity/src/utils";

export default defineArrayMember({
	name: "ctas",
	title: "Call-to-actions",
	icon: VscInspect,
	type: "object",
	fields: [
		defineField({
			name: "ctas",
			title: "Call-to-actions",
			type: "array",
			of: [{ type: "cta" }],
		}),
	],
	preview: {
		select: {
			ctas: "ctas",
		},
		prepare: ({ ctas }) => ({
			title: count(ctas, "CTA"),
		}),
	},
});
