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
			S.divider(),

			// Pages Section
			S.listItem()
				.title("Pages")
				.icon(VscMultipleWindows)
				.child(
					S.list()
						.title("Pages")
						.items([
							S.documentTypeListItem("page").title("Pages").icon(VscMultipleWindows),
							// Add additional page-related types here
						]),
				),
			S.divider(),

			// FAQ Section
			S.listItem()
				.title("FAQ")
				.icon(VscQuestion)
				.child(
					S.list()
						.title("FAQ")
						.items([
							S.documentTypeListItem("faqNavigation").title("FAQ Navigation").icon(VscQuestion),
						]),
				),
			S.divider(),

			// Cards Section
			S.listItem()
				.title("Cards")
				.icon(VscCreditCard)
				.child(
					S.list()
						.title("Cards")
						.items([S.documentTypeListItem("card").title("Cards").icon(VscCreditCard)]),
				),
			S.divider(),

			// Specialists Section
			S.listItem()
				.title("Specialists")
				.icon(VscPerson)
				.child(
					S.list()
						.title("Specialists")
						.items([S.documentTypeListItem("specialist").title("Specialists").icon(VscPerson)]),
				),
			S.divider(),

			// Gallery Section
			S.listItem()
				.title("Galleries")
				.icon(RiGalleryLine)
				.child(
					S.list()
						.title("Galleries")
						.items([S.documentTypeListItem("gallery").title("Galleries").icon(RiGalleryLine)]),
				),
			S.divider(),

			// Services Section
			S.documentTypeListItem("service").title("Usługi").icon(VscCreditCard), // Reuse icon or add another one
		]);

export default structure;
