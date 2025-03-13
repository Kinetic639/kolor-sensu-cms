import React from "react";
import { ConsultationEmail } from "@/components/email/ConsultationEmail";

const EmailPreviewPage: React.FC = () => {
	const testEmailProps = {
		name: "John Doe",
		moodRating: 7,
		meetingType: "Online",
		emotionalDifficulties: ["Anxiety", "Stress"],
		lifeSupportAreas: ["Work", "Family"],
		helpfulSupport: ["Therapy", "Counseling"],
		neurodiversityDiagnosis: "1",
		neurodiversityNeeds: ["Routine", "Quiet Environment"],
		email: "john.doe@example.com",
		phone: "123456789",
		message: "This is a test message.",
	};

	return <ConsultationEmail {...testEmailProps} />;
};

export default EmailPreviewPage;
