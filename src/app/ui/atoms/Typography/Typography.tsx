// src/components/ui/atoms/typography/typography.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "text-2xl md:text-4xl font-bold",
			h2: "text-3xl font-semibold",
			h3: "text-2xl font-semibold",
			h4: "text-xl font-semibold",
			h5: "text-lg font-medium",
			h6: "text-base font-medium",
			body1: "text-base",
			body2: "text-sm",
			caption: "text-xs",
			button: "text-sm font-bold uppercase",
		},
		color: {
			primary: "text-primary",
			secondary: "text-secondary",
			error: "text-destructive",
			warning: "text-warning",
			info: "text-info",
			success: "text-success",
			default: "text-foreground",
		},
	},
	defaultVariants: {
		variant: "body1",
		color: "default",
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
