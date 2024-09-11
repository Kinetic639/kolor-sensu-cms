"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {type FC} from "react";
import processUrl from "@/lib/processUrl";
import LinkList from "@sanity/schemas/objects/link.list";
import CTA from "@/app/ui/CTA";

const linkVariants = {
	hidden: { opacity: 0, y: 0 },
	visible: { opacity: 1, y: 0 },
};

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.01,
		},
	},
};

interface CategoriesNavProps {
	navigation?: Sanity.Navigation
}

export const CategoriesNav: FC<CategoriesNavProps> = ({navigation}) => {
	const path = usePathname();

	return (
		<nav className="max-md:anim-fade-to-r flex gap-y-2 [grid-area:nav] max-md:my-4 max-md:flex-col max-md:header-closed:hidden">
			{navigation?.items?.map((item, key) => {
				switch (item._type) {
					case "link":
						return <CTA className="hover:link md:px-3" link={item} key={key} />;

					default:
						return null;
				}
			})}
		</nav>
	);

	// return (
	// 	<motion.nav
	// 		initial="hidden"
	// 		animate="visible"
	// 		variants={containerVariants}
	// 		className="flex w-full flex-1 flex-grow items-center gap-x-4 px-6 border border-red-400"
	// 	>
	// 		{navigation && navigation.items?.map((item, index) => {
	// 			const isActive = item.internal === path;
	//
	// 			return (
	// 				<motion.div key={index} variants={linkVariants}>
	// 					<Link
	// 						href={processUrl(item.internal, {
	// 							base: false,
	// 							params: item.params,
	// 						})}
	// 						className={`relative pb-0.5 text-sm font-medium capitalize transition-all hover:text-red-500 ${
	// 							isActive ? "text-red-500" : ""
	// 						}`}
	// 					>
	// 						{isActive && (
	// 							<motion.span
	// 								initial={{ y: "-100%" }}
	// 								animate={{ y: 0 }}
	// 								transition={{ type: "tween" }}
	// 								layoutId="underline"
	// 								className="absolute left-0 top-full h-[2px] w-full bg-red-500"
	// 							/>
	// 						)}
	// 						{item.label}
	// 					</Link>
	// 				</motion.div>
	// 			);
	// 		})}
	// 	</motion.nav>
	// );
};
