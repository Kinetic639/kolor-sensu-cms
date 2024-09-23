import type { StructureResolver } from "sanity/structure";
import { VscMultipleWindows, VscServerProcess, VscQuestion, VscCreditCard } from "react-icons/vsc"; // Icon for FAQ

import { singleton } from "./utils";

const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			singleton(S, "site", "Site settings").icon(VscServerProcess),
			S.documentTypeListItem("announcement").title("Announcements"),
			S.divider(),

			S.documentTypeListItem("page").title("Pages").icon(VscMultipleWindows),
			// S.documentTypeListItem("blog.post").title("Blog posts"),
			// S.documentTypeListItem("blog.category").title("Blog categories"),
			// S.divider(),
			//
			S.documentTypeListItem("navigation"),
			// S.documentTypeListItem("redirect").title("Redirects"),
			// S.divider(),
			//
			// group(S, "Miscellaneous", [
			// 	S.documentTypeListItem("logo").title("Logos"),
			// 	S.documentTypeListItem("pricing").title("Pricing tiers"),
			// 	S.documentTypeListItem("reputation"),
			// 	S.documentTypeListItem("testimonial").title("Testimonials"),
			// ]).icon(BsDatabaseAdd),
			S.divider(),
			S.documentTypeListItem("faqNavigation").icon(VscQuestion),

			S.divider(),
			S.documentTypeListItem("card").title("Cards").icon(VscCreditCard), // New card section
			S.divider(),
			S.documentTypeListItem("specialist").title("Specialists"),
			S.divider(),
			S.documentTypeListItem("gallery").title("Galleries"),
			S.documentTypeListItem("service").title("Usługi"),
		]);

export default structure;
