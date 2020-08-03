import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>Roger will help you build the greatest apps</p>
				<p>
					Using Next.js the absolute ideas will come to life
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
		</Layout>
	);
}
