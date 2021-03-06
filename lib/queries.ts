/** @format */

import { article, PrismaClient, spreads } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFrontpageArticles() {
	await prisma.$connect();

	const curr = new Date();
	let month = curr.getMonth() + 1;
	let year = curr.getFullYear();

	let articles: article[] = await prisma.article.findMany({
		where: {
			year: year,
			month: month,
			published: true,
			img: {
				contains: ".",
			},
		},
	});

	while (articles.length === 0) {
		month--;
		if (month === 0) {
			month = 12;
			year--;
		}
		articles = await prisma.article.findMany({
			where: {
				year: year,
				month: month,
				published: true,
				img: {
					contains: ".",
				},
			},
		});
	}

	prisma.$disconnect();

	return articles;
}

export async function getPublishedArticles() {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		where: {
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
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
		orderBy: [
			{
				month: "desc",
			},
		],
		where: {
			category: cat,
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticlesBySubcategory(subcat: string) {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		orderBy: [
			{
				month: "desc",
			},
		],
		where: {
			subcategory: subcat,
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
}

export async function getArticlesByAuthor(author: string) {
	await prisma.$connect();

	const articles = await prisma.article.findMany({
		orderBy: [
			{
				month: "desc",
			},
		],
		where: {
			authors: {
				has: decodeURI(author),
			},
			published: true,
		},
	});

	prisma.$disconnect();

	return articles;
}

export async function getSpreads() {
	await prisma.$connect();

	const spreads = await prisma.spreads.findMany();

	prisma.$disconnect();

	return spreads;
}

export async function getSpread(slug: string) {
	await prisma.$connect();

	const spreads = await prisma.spreads.findFirst({
		where: {
			title: decodeURI(slug),
		},
	});

	prisma.$disconnect();

	return spreads;
}
