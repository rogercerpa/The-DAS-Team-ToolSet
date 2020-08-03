import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function DASMembers() {
	return (
		<Layout>
			<Head>
				<title>Welcome Team member</title>
			</Head>
			<h1> Hi Roger, Here are all the team members:</h1>
			<h2>
				<Link href="/">
					<a>Home</a>
				</Link>
			</h2>
			
		</Layout>
	);
}
