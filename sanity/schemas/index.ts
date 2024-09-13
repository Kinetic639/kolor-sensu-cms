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

// objects

// modules

export const schemaTypes = [
	// documents
	site,
	page,
	logo,
	navigation,

	// objects
	metadata,
	cta,
	link,
	linkList,

	// modules
	hero,
	heroSaas,
	HeroSplit,
];
