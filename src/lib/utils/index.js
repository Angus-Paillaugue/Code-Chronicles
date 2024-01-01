export function formatDate(date, dateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(date);
}

export const urlHealer = {
	identifier: {
		separate: (url) => {
			const [id, slug] = url.split('-').reverse();
			return { id, slug };
		},
		join: (slug, id) => `${slug}-${id}`
	},
	sanitize: (url) => url.trim().replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-')).replace(/^-+|-+$/g, '').replace(/-{2,}/g, (m) => (options && options.condense ? '-' : m)).toLowerCase()
}