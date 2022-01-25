import { article, PrismaClient } from "@prisma/client";
import { ArticleData } from "~/lib/utils";

const prisma = new PrismaClient();

export async function getFrontpageArticles() {
	await prisma.$connect();

	const curr = new Date();
	const month = curr.getMonth() + 1;
	const year = curr.getFullYear();

	console.log(month + " " + year);

	const articles: article[] = await prisma.article.findMany({
		where: {
			year: year,
			month: month,
			published: true,
		}
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticleById(id: string) {
	await prisma.$connect();

	const article = await prisma.article.findFirst({
		where: {
			id: id,
			published: true,
		},
	});

	prisma.$disconnect();

	return article;
}

export async function getArticle(year: string, month: string, cat: string, slug: string) {
	await prisma.$connect();

	const article = await prisma.article.findFirst({
		where: {
			year: parseInt(year),
			month: parseInt(month),
			category: cat,
			title: decodeURI(slug),
			published: true,
		},
	});

	prisma.$disconnect();

	return article;
}

export async function getArticlesByDate(year: string, month: string) {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		where: {
			year: parseInt(year),
			month: parseInt(month),
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticlesByCategory(cat: string) {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		where: {
			category: cat,
			published: true,
		},
	});

	prisma.$disconnect();

	const data: ArticleData = {
		slug: cat,
		articles: articles,
	};

	return data;
}

export async function getArticlesBySubcategory(subcat: string) {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		where: {
			subcategory: subcat,
			published: true,
		},
	});

	prisma.$disconnect();

	const data: ArticleData = {
		slug: subcat,
		articles: articles,
	};

	return data;
}

export async function getArticlesByAuthor(author: string) {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		where: {
			authors: {
				has: decodeURI(author)
			},
			published: true,
		},
	});

	prisma.$disconnect();

	const data: ArticleData = {
		slug: author,
		articles: articles,
	};

	return data;
}
