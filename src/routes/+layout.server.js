import { allPosts } from '$lib/server/posts';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const posts = await allPosts();
    
    const allLanguages = posts.flatMap(obj => obj.languages);
    const languageCounts = new Map();
    allLanguages.forEach(language => {
        const count = languageCounts.get(language) || 0;
        languageCounts.set(language, count + 1);
    });
    const sortedLanguages = Array.from(languageCounts.entries()).sort((a, b) => b[1] - a[1]);
    const topLanguages = sortedLanguages.slice(0, 6).map(entry => entry[0]);

    return { topLanguages };
};
