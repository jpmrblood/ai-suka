import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
	const posts = await getCollection('blog');
	
	const searchIndex = posts.map(post => ({
		title: post.data.title,
		description: post.data.description,
		url: `${import.meta.env.BASE_URL}/${post.id}/`,
		categories: post.data.categories || [],
		tags: post.data.tags || [],
		pubDate: post.data.pubDate.toISOString(),
	}));

	return new Response(JSON.stringify(searchIndex), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
