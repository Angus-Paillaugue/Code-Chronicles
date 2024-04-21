import { allPosts } from '$lib/server/posts.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const posts = await allPosts();

  // Count the number of posts in each language
  const allLanguages = posts.flatMap((obj) => obj?.languages).filter((e) => e);
  const languageCounts = new Map();
  allLanguages.forEach((language) => {
    const count = languageCounts.get(language) || 0;
    languageCounts.set(language, count + 1);
  });

  // Sort by count, then alphabetically
  const sortedLanguages = Array.from(languageCounts.entries()).sort((a, b) =>
    b[1] - a[1] === 0 ? a[0].localeCompare(b[0]) : b[1] - a[1]
  );
  // Get the top 6 languages
  const topLanguages = sortedLanguages.slice(0, 6).map((entry) => entry[0]);

  return {
    topLanguages,
  };
}
