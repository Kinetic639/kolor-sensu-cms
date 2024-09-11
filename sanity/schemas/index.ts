import site from "./documents/site";
import page from "./documents/page";
import logo from "@sanity/schemas/documents/logo";
import metadata from "@sanity/schemas/objects/metadata";
import navigation from "@sanity/schemas/documents/navigation";
import link from "@sanity/schemas/objects/link";
import linkList from "@sanity/schemas/objects/link.list";
import cta from "@sanity/schemas/objects/cta";

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
];
