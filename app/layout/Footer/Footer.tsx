import Link from 'next/link'

import styles from './footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles['footer']}>
			<div className={styles['footer-container']}>
				<div className={styles['info-container']}>
					<h4>Contact</h4>
					<p>
						Email: <a href="mailto:your.email@example.com">your.email@example.com</a>
					</p>
					<p>
						Phone: <a href="tel:+1234567890">+1 234 567 890</a>
					</p>
				</div>
				<div className="info-container">
					<h4>Follow Me</h4>
					<a href="https://linkedin.com/in/yourprofile" aria-label="LinkedIn">
						LinkedIn
					</a>
					<a href="https://github.com/yourprofile" aria-label="GitHub">
						GitHub
					</a>
					<a href="https://twitter.com/yourprofile" aria-label="Twitter">
						Twitter
					</a>
				</div>
				<div className={styles['info-container']}>
					<h4>Quick Links</h4>
					<Link className={styles['link']} href="/">
						Home
					</Link>
					<Link className={styles['link']} href="/about">
						About
					</Link>
					<Link className={styles['link']} href="/projects">
						Projects
					</Link>
					<Link className={styles['link']} href="/blog">
						Blog
					</Link>
					<Link className={styles['link']} href="/contact">
						Contact
					</Link>
				</div>
			</div>
			<div className={styles['policy-container']}>
				<p>© 2024 Jungkyu Yang. All rights reserved.</p>
				<Link href="/privacy-policy">Privacy Policy</Link>
				<Link href="/terms-of-service">Terms of Service</Link>
			</div>
		</footer>
	)
}

export default Footer
