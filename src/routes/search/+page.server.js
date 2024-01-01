import { searchPosts } from '$lib/server/posts.js';

export const load = async ({ url }) => {
  const posts = await searchPosts(url.searchParams.get('query'));

  return {
    posts,
  };
};
