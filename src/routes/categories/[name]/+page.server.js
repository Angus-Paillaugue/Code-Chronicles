import { postsByCategory } from '$lib/server/posts.js';

export const load = async ({ params }) => {
  const { name } = params;
  const posts = postsByCategory(name);

  return {
    posts,
  };
};
