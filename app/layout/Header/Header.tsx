'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import styles from './header.module.scss'
import LogoSVG from '../../../public/image/logo.svg'

const Header = () => {
	const path = usePathname()

	return (
		<header className={styles['header']}>
			<div className={styles['header-container']}>
				<div className={styles['logo-container']}>
					<Image className={styles['logo-img']} alt="LogoImg" src={LogoSVG} />
				</div>
				<nav className={styles['navigation']} aria-label="Main Navigation">
					<ul>
						<li>
							<Link href="/career">경력</Link>
						</li>
						<li>
							<Link href="/hard-skills">하드 스킬</Link>
						</li>
						<li>
							<Link href="/soft-skills">소프트 스킬</Link>
						</li>
						<li>
							<Link href="/propose">동료로 찜하기</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Header
