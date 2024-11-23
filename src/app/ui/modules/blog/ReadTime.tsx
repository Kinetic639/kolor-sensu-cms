export default function ReadTime({ value }: { value: number }) {
	const getMinuteLabel = (minutes: number) => {
		// Zapisujemy ostatnią cyfrę oraz dwie ostatnie cyfry liczby minut, aby prawidłowo odmieniać słowo "minuta"
		const lastDigit = minutes % 10;
		const lastTwoDigits = minutes % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
			return "minut";
		} else if (lastDigit === 1) {
			return "minuta";
		} else if (lastDigit >= 2 && lastDigit <= 4) {
			return "minuty";
		} else {
			return "minut";
		}
	};

	const roundedMinutes = Math.ceil(value);

	return (
		<span className="with-icon gap-1">
			Czas czytania: {roundedMinutes} {getMinuteLabel(roundedMinutes)}
		</span>
	);
}
