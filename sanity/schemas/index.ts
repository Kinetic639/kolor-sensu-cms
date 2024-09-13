import site from "./documents/site";
import page from "./documents/page";
import logo from "@sanity/schemas/documents/logo";
import metadata from "@sanity/schemas/objects/metadata";
import navigation from "@sanity/schemas/documents/navigation";
import link from "@sanity/schemas/objects/link";
import linkList from "@sanity/schemas/objects/link.list";
import cta from "@sanity/schemas/objects/cta";
import HeroSplit from "@sanity/schemas/modules/hero.split";
import heroSaas from "@sanity/schemas/modules/hero.saas";
import hero from "@sanity/schemas/modules/hero";
import banner from "@sanity/schemas/modules/banner";
import faqItem from "@sanity/schemas/objects/faqItem";
import faqList from "@sanity/schemas/objects/faqList";
import faqLists from "@sanity/schemas/documents/faqLists";
import cardSection from "@sanity/schemas/modules/cardSection";
import card from "@sanity/schemas/documents/card";

// objects

// modules

export const schemaTypes = [
	// documents
	site,
	page,
	logo,
	navigation,
	faqLists,

	// objects
	metadata,
	cta,
	link,
	linkList,
	faqItem,
	faqList,
	card,

	// modules
	hero,
	heroSaas,
	HeroSplit,
	banner,
	cardSection,
];
