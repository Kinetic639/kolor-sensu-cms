import React, { type FC } from "react";
import { cn } from "@/lib/utils";
interface SectionWrapperProps {
	children: React.ReactNode;
	className?: string;
}

export const SectionWrapper: FC<SectionWrapperProps> = ({ children, className }) => {
	return (
		<section className={cn("mx-auto max-w-screen-xl px-4 md:px-0", className)}>{children}</section>
	);
};
