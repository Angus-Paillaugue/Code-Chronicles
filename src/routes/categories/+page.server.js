import { allPosts } from "$lib/server/posts";

export const load = async ({}) => {
  let posts = allPosts();

  let postsByCategory = {};
  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!postsByCategory[category]) {
        postsByCategory[category] = [];
      }
      postsByCategory[category].push(post);
    });
  });
  postsByCategory = Object.keys(postsByCategory)
    .sort()
    .reduce((obj, key) => {
      obj[key] = postsByCategory[key];
      return obj;
    }, {});

  return { posts: postsByCategory };
};
