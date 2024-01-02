export function allPosts() {
  let posts = [];

  const paths = import.meta.glob('/src/lib/posts/*.md', {
    eager: true,
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const post = {
        ...file.metadata,
        slug,
      };
      post.published && posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );
  posts = posts.map((post, index) => ({
    ...post,
    id: index,
  }));

  return posts;
}

export async function postBySlug(slug) {
  const posts = allPosts();
  return posts.find((post) => post.slug == slug);
}
export function postById(id) {
  const posts = allPosts();
  return posts.find((post) => post.id == id);
}

export function postsByLanguage(language) {
  const posts = allPosts();
  return posts.filter((post) => post.languages.includes(language));
}

export function postsByCategory(category) {
  const posts = allPosts();
  return posts.filter((post) => post.categories.includes(category));
}

function calculateTolerance(str1, str2) {
  const maxTolerance = 2;
  const minLength = Math.min(str1.length, str2.length);
  let tolerance = 0;

  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      tolerance++;
      if (tolerance > maxTolerance) return false;
    }
  }

  return true;
}

export function searchPosts(query) {
  const posts = allPosts();
  const searchQuery = query.toLowerCase();

  return posts.filter((post) => {
    const { title, languages, categories } = post;
    const postTitle = title.toLowerCase();

    if (languages.includes(searchQuery) || categories.includes(searchQuery)) return true;
    if (calculateTolerance(postTitle, searchQuery)) return true;

    return false;
  });
}
