import React, { type FC } from "react";
import { cn } from "@/lib/utils";
interface AppWrapperProps {
	children: React.ReactNode;
	className?: string;
}

export const AppWrapper: FC<AppWrapperProps> = ({ children, className }) => {
	return <main className={cn("", className)}> {children}</main>;
};
