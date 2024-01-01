import { allPosts } from '$lib/server/posts.js';

export const load = async ({}) => {
  let posts = await allPosts();

  const postsByLanguage = {};
  posts.forEach((post) => {
    post.languages.forEach((language) => {
      if (!postsByLanguage[language]) {
        postsByLanguage[language] = [];
      }
      postsByLanguage[language].push(post);
    });
  });

  return {
    posts: postsByLanguage,
  };
};
