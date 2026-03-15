export interface TocItem {
	slug: string;
	text: string;
	depth: number;
}

export function extractHeadings(content: string): TocItem[] {
	const headingRegex = /^(#{1,3})\s+(.+)$/gm;
	const headings: TocItem[] = [];
	let match;

	while ((match = headingRegex.exec(content)) !== null) {
		const depth = match[1].length;
		const text = match[2].trim();
		const slug = text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

		headings.push({ slug, text, depth });
	}

	return headings;
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
