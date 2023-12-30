import { postsRef } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const posts = await postsRef.find({  }).sort({ date:1 }).project({ _id:0 }).toArray();

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
