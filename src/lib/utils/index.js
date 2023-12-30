export function formatDate(date, dateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(date);
}