export default function Category({
	value,
	label,
}: {
	value?: Sanity.BlogCategory;
	label?: string;
}) {
	return (
		<>
			<span className="text-xs text-foreground">#</span>
			{label || value?.title}
		</>
	);
}
