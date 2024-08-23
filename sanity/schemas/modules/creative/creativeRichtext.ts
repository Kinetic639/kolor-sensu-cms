/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument*/

import { defineArrayMember, defineField } from "sanity";
import { VscSymbolKeyword } from "react-icons/vsc";
import { getBlockText } from "@sanity/src/utils";

export default defineArrayMember({
	name: "richtext",
	icon: VscSymbolKeyword,
	type: "object",
	fields: [
		defineField({
			name: "content",
			type: "array",
			of: [{ type: "block" }],
		}),
	],
	preview: {
		select: {
			content: "content",
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: "Richtext",
		}),
	},
});
