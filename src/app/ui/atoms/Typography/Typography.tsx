// src/components/ui/atoms/typography/typography.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "text-mobile-h1 md:text-desktop-h1",
			h2: "text-mobile-h2 md:text-desktop-h2",
			h3: "text-mobile-h3 md:text-desktop-h3",
			h4: "text-mobile-h4 md:text-desktop-h4",
			h5: "text-mobile-h5 md:text-desktop-h5",
			h6: "text-mobile-h6 md:text-desktop-h6",
			body1: "text-mobile-p md:text-desktop-p",
			body2: "text-mobile-small md:text-desktop-small",
			caption: "text-mobile-small md:text-desktop-small",
			button: "text-mobile-small md:text-desktop-small font-bold uppercase",
		},
		color: {
			inherit: "", // Empty string to ensure no color is applied, allowing it to inherit
			primary: "text-primary",
			secondary: "text-secondary",
			error: "text-destructive",
			warning: "text-warning",
			info: "text-info",
			success: "text-success",
			default: "text-foreground", // This can still be used for default override
		},
	},
	defaultVariants: {
		variant: "body1",
		color: "inherit", // Default to inherit text color
	},
});

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
	as?: React.ElementType;
	className?: string;
	children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
	({ as: Component = "p", variant, color, className, children, ...props }, ref) => {
		return (
			<Component
				className={cn(typographyVariants({ variant, color, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</Component>
		);
	},
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
