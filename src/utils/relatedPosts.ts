import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
	currentPost: CollectionEntry<'blog'>,
	allPosts: CollectionEntry<'blog'>,
	limit: number = 3
): CollectionEntry<'blog'>[] {
	const currentCategories = currentPost.data.categories || [];
	const currentTags = currentPost.data.tags || [];

	const scoredPosts = allPosts
		.filter((post) => post.id !== currentPost.id)
		.map((post) => {
			let score = 0;
			const postCategories = post.data.categories || [];
			const postTags = post.data.tags || [];

			for (const category of currentCategories) {
				if (postCategories.includes(category)) score += 3;
			}

			for (const tag of currentTags) {
				if (postTags.includes(tag)) score += 1;
			}

			return { post, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({ post }) => post);

	return scoredPosts;
}
