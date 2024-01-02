// import { error } from '@sveltejs/kit';

export async function load({ data }) {
  const paths = import.meta.glob('$lib/posts/*.md', {
    eager: true,
  });

  console.log(paths)

  const post = Object.entries(paths)
    .map(([key, val]) => {
      if (key.endsWith(data.post.slug + '.md')) {
        return {
          ...val.metadata,
          component: val.default,
          slug: data.post.slug,
        };
      }
    })
    .filter((e) => e)[0];

  // if (post)
    return {
      ...data,
      post,
      paths
    };

  // throw new error(404, `Post not found !`);
}
