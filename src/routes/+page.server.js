import { allPosts } from '$lib/server/posts.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const posts = await allPosts();

  const mostRecentPosts = posts.slice(0, 10);
  return { mostRecentPosts };
}
