import { postsByLanguage } from '$lib/server/posts';

export const load = async ({ params }) => {
  const { name } = params;
  const posts = postsByLanguage(name);

  return {
    posts,
  };
};
