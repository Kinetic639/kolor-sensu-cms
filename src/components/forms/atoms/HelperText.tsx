import React, { type FC } from "react";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { cn } from "@/lib/utils";
interface HelperTextProps {
	children?: React.ReactNode;
	className?: string;
}
const HelperText: FC<HelperTextProps> = ({ children, className }) => {
	return (
		<Typography
			as="p"
			variant="caption"
			className={cn("mt-4 text-center font-normal text-gray-500", className)}
		>
			{children}
		</Typography>
	);
};
export default HelperText;
