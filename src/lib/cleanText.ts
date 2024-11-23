export function cleanText(text: string): string {
	return text
		.replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove non-printable characters
		.trim() // Remove leading and trailing whitespace
		.toLowerCase(); // Convert to lowercase
}
