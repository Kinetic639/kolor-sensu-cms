import React, { type FC } from "react";
import { cn } from "@/lib/utils";
interface AppWrapperProps {
	children: React.ReactNode;
	className?: string;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children, className }) => {
	return (
		<main className={cn("flex flex-1 flex-grow flex-col items-stretch", className)}>
			{children}
		</main>
	);
};
