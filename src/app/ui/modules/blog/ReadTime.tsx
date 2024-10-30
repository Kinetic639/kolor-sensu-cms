export default function ReadTime({ value }: { value: number }) {
	return <span className="with-icon gap-1">Czas czytania: {Math.ceil(value)} minut</span>;
}
