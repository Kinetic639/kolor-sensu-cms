import type { StructureResolver } from "sanity/structure";
import {
	VscMultipleWindows,
	VscServerProcess,
	VscQuestion,
	VscCreditCard,
	VscPerson,
} from "react-icons/vsc"; // Icons for sections
import { RiGalleryLine } from "react-icons/ri";
import { singleton } from "./utils";

const structure: StructureResolver = (S) =>
	S.list()
		.title("Content")
		.items([
			// Site settings and Announcements
			singleton(S, "site", "Site settings").icon(VscServerProcess),
			S.documentTypeListItem("announcement").title("Announcements"),
			S.documentTypeListItem("navigation"),
			S.divider(),
			S.listItem()
				.title("Blog")
				.icon(RiGalleryLine)
				.child(
					S.list()
						.title("Blog")
						.items([
							S.documentTypeListItem("blog.post").title("Blog posts"),
							S.documentTypeListItem("blog.category").title("Blog categories"),
						]),
				),

			S.divider(),

			// Pages Section
			S.documentTypeListItem("page").title("Pages").icon(VscMultipleWindows),
			S.divider(),

			// FAQ Section
			S.documentTypeListItem("faqNavigation").title("FAQ Navigation").icon(VscQuestion),
			S.divider(),

			// Cards Section
			S.documentTypeListItem("card").title("Cards").icon(VscCreditCard),
			S.divider(),

			// Specialists Section
			S.documentTypeListItem("specialist").title("Specialists").icon(VscPerson),
			S.divider(),

			// Gallery Section
			S.documentTypeListItem("gallery").title("Galleries").icon(RiGalleryLine),
			S.divider(),

			// Services Section
			S.documentTypeListItem("service").title("Usługi").icon(VscCreditCard), // Reuse icon or add another one
		]);

export default structure;
