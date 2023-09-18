import { Providers } from "./providers"


export const metadata = {
	title: 'See Through',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}
