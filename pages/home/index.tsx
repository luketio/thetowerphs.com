/** @format */

import { article } from "@prisma/client";
import Head from "next/head";
import Mosaic from "~/components/mosaic.client";
import { getFrontpageArticles } from "~/lib/queries";

export async function getServerSideProps() {
	const articles: article[] = await getFrontpageArticles();

	return {
		props: {
			articles,
		},
	};
}

interface Props {
	articles: article[];
}

export default function Index({ articles }: Props) {
	return (
		<div>
			<Head>
				<meta property="og:title" content="Home | The Tower" />
				<meta property="og:description" content="The Tower is Princeton High School's newspaper club." />
			</Head>
			<Mosaic articles={articles} />
		</div>
	);
}
