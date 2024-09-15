export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" />
				<title className="sr-only">sanity admin dashboard</title>
			</head>
			<body style={{ margin: 0 }}>{children}</body>
		</html>
	);
}
