"use client";
import React, { useEffect } from "react";

const Calendar: React.FC = () => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			// Clean up the script when the component unmounts
			document.body.removeChild(script);
		};
	}, []);

	return <div className="tidycal-embed" data-path="michalstepien36/30-minute-meeting"></div>;
};

export default Calendar;
