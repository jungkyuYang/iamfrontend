import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './styles/reset.scss'
import './styles/global.scss'
import Footer from './components/Footer'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		template: '%s | Jungkyu Yang',
		default: 'Loading...',
	},
	description: '프론트엔드 개발자 양정규 포트폴리오',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
