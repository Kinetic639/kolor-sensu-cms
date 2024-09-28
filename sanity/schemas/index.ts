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
import cardSection from "@sanity/schemas/modules/cardSection";
import card from "@sanity/schemas/documents/card";
import faqNavigation from "@sanity/schemas/documents/faqNavigation";
import announcement from "@sanity/schemas/documents/announcement";
import specialist from "@sanity/schemas/documents/specialist";
import specialistModule from "@sanity/schemas/modules/specialistModule";
import gallery from "@sanity/schemas/documents/gallery";
import galleryModule from "@sanity/schemas/modules/galleryModule";
import faqModule from "@sanity/schemas/modules/faqModule";
import service from "@sanity/schemas/documents/service";
import servicesModule from "@sanity/schemas/modules/servicesModule";
import contactModule from "@sanity/schemas/modules/contactModule";
import consultationTestModule from "@sanity/schemas/modules/consultationTestModule";

// objects

// modules

export const schemaTypes = [
	// documents
	site,
	page,
	logo,
	navigation,
	faqNavigation,
	announcement,
	specialist,
	gallery,
	service,

	// objects
	metadata,
	cta,
	link,
	linkList,
	faqItem,
	card,

	// modules
	hero,
	heroSaas,
	HeroSplit,
	banner,
	cardSection,
	specialistModule,
	galleryModule,
	faqModule,
	servicesModule,
	contactModule,
	consultationTestModule,
];
