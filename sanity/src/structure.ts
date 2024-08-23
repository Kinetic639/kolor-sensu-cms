import type { StructureResolver } from "sanity/structure";

import { VscMultipleWindows, VscServerProcess } from "react-icons/vsc";
import { group, singleton } from "./utils";

const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			singleton(S, "site", "Site settings").icon(VscServerProcess),
			S.divider(),

			S.documentTypeListItem("page").title("Pages").icon(VscMultipleWindows),
			// S.documentTypeListItem("blog.post").title("Blog posts"),
			// S.documentTypeListItem("blog.category").title("Blog categories"),
			// S.divider(),
			//
			// S.documentTypeListItem("announcement").title("Announcements"),
			// S.documentTypeListItem("navigation"),
			// S.documentTypeListItem("redirect").title("Redirects"),
			// S.divider(),
			//
			// group(S, "Miscellaneous", [
			// 	S.documentTypeListItem("logo").title("Logos"),
			// 	S.documentTypeListItem("pricing").title("Pricing tiers"),
			// 	S.documentTypeListItem("reputation"),
			// 	S.documentTypeListItem("testimonial").title("Testimonials"),
			// ]).icon(BsDatabaseAdd),
		]);

export default structure;
