import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import HelperText from "@/components/forms/atoms/HelperText";
import type { FormData } from "@/components/forms/schema";

const Step3: React.FC = () => {
	const {
		formState: { errors },
		setValue,
		control,
		trigger,
	} = useFormContext<FormData>();
	const name = useWatch({ control, name: "name" });
	const selectedMeetingType = useWatch({ control, name: "meetingType" });

	const handleRadioChange = async (value: string) => {
		setValue("meetingType", value, { shouldValidate: true });
		await trigger("meetingType");
	};
	return (
		<div>
			<Typography as="p" variant="h4" className="mb-5 text-center">
				{name}, jakiego spotkania potrzebujesz?
			</Typography>

			<div className="mx-auto mt-10 flex max-w-sm flex-col space-y-6">
				{["Stacjonarnie", "Online", "Bez znaczenia"].map((option) => (
					<motion.label
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.95 }}
						key={option}
						className={`relative flex cursor-pointer items-center justify-between rounded-full border p-4 px-6 shadow-md transition-all duration-300 ${selectedMeetingType === option ? "border-[#2e4554] bg-[#2e4554] text-white" : "border-gray-300 bg-white text-[#2e4554]"}`}
					>
						<input
							type="radio"
							value={option}
							onChange={(e) => handleRadioChange(e.target.value)}
							className="hidden"
						/>
						<span className="font-semibold">{option}</span>
						<span className="">&rarr;</span>
					</motion.label>
				))}
			</div>

			{errors.meetingType?.message && <HelperText>{errors.meetingType.message}</HelperText>}
		</div>
	);
};

export default Step3;
