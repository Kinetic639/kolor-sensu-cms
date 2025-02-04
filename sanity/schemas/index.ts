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
import blogPost from "@sanity/schemas/documents/blog.post";
import blogCategory from "@sanity/schemas/documents/blog.category";
import blogList from "@sanity/schemas/modules/blog-list";
import blogPostContent from "@sanity/schemas/modules/blog-post-content";
import uid from "@sanity/schemas/objects/uid";
import product from "@sanity/schemas/documents/product";
import productsModule from "@sanity/schemas/modules/productsModule";
import podcastModule from "@sanity/schemas/modules/podcastModule";
import heroModern from "@sanity/schemas/modules/hero.modern";
import splitContent from "@sanity/schemas/modules/split.content";
import heroWithCard from "@sanity/schemas/modules/hero.withCard";
import bannerText from "@sanity/schemas/modules/bannerText";
import actionBanner from "@sanity/schemas/modules/actionBanner";
import heroMosaic from "@sanity/schemas/modules/hero.mosaic";

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
	blogPost,
	blogCategory,
	product,

	// objects
	metadata,
	cta,
	link,
	linkList,
	faqItem,
	card,
	uid,

	// modules
	hero,
	heroSaas,
	blogList,
	blogPostContent,
	heroModern,
	HeroSplit,
	heroMosaic,
	banner,
	cardSection,
	specialistModule,
	galleryModule,
	faqModule,
	servicesModule,
	contactModule,
	consultationTestModule,
	productsModule,
	podcastModule,
	splitContent,
	heroWithCard,
	bannerText,
	actionBanner,
];
