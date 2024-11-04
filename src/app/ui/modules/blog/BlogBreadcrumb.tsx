import React, { type FC } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogBreadcrumbProps {
	title: string;
}

export const BlogBreadcrumb: FC<BlogBreadcrumbProps> = ({ title }) => {
	return (
		<Breadcrumb className="hidden md:block">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Strona główna</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>{title}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
};
