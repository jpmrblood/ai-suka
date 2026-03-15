export interface TocItem {
	slug: string;
	text: string;
	depth: number;
}

export function extractHeadings(content: string): TocItem[] {
	const headings: TocItem[] = [];

	// Match markdown headings: # ## ###
	const markdownRegex = /^(#{1,3})\s+(.+)$/gm;
	let match;

	while ((match = markdownRegex.exec(content)) !== null) {
		const depth = match[1].length;
		const text = match[2].trim();
		const slug = slugify(text);
		headings.push({ slug, text, depth });
	}

	// Match JSX headings: <h1>, <h2>, <h3>
	const jsxRegex = /<h([1-3])[^>]*>([^<]+)<\/h\1>/gi;

	while ((match = jsxRegex.exec(content)) !== null) {
		const depth = parseInt(match[1]);
		const text = match[2].trim();
		const slug = slugify(text);

		// Avoid duplicates if both markdown and JSX exist
		if (!headings.some(h => h.text === text)) {
			headings.push({ slug, text, depth });
		}
	}

	// Sort by position in document (already in order due to regex execution)
	return headings;
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
