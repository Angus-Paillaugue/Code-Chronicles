/**
 * Retrieves all posts.
 * @returns {Array} An array of post objects.
 */
export function allPosts() {
  let posts = [];

  const paths = import.meta.glob('/src/posts/*.md', {
    eager: true,
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '').toLowerCase();
    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const post = {
        ...file.metadata,
        slug,
      };
      post.published && posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
  );
  posts = posts.map((post, index) => ({
    ...post,
    id: index,
  }));

  return posts;
}

/**
 * Retrieves a post by its slug.
 * @param {string} slug - The slug of the post.
 * @returns {Object} The post object.
 */
export async function postBySlug(slug) {
  const posts = allPosts();
  return posts.find((post) => post.slug == slug.toLowerCase());
}

/**
 * Retrieves a post by its ID.
 * @param {number} id - The ID of the post.
 * @returns {Object} The post object.
 */
export function postById(id) {
  const posts = allPosts();
  return posts.find((post) => post.id == id);
}

/**
 * Retrieves posts by language.
 * @param {string} language - The language to filter posts by.
 * @returns {Array} An array of post objects.
 */
export function postsByLanguage(language) {
  const posts = allPosts();
  return posts.filter((post) =>
    post.languages
      .map((el) => el.toLowerCase())
      .includes(language.toLowerCase())
  );
}

/**
 * Retrieves posts by category.
 * @param {string} category - The category to filter posts by.
 * @returns {Array} An array of post objects.
 */
export function postsByCategory(category) {
  const posts = allPosts();
  return posts.filter((post) =>
    post.categories
      .map((el) => el.toLowerCase())
      .includes(category.toLowerCase())
  );
}

/**
 * Calculates the tolerance between two strings.
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {boolean} True if the tolerance is within the maximum tolerance, false otherwise.
 */
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

/**
 * Searches for posts based on a query.
 * @param {string} query - The search query.
 * @returns {Array | false} An array of post objects that match the search query or false if none are matching.
 */
export function searchPosts(query) {
  const posts = allPosts();
  const searchQuery = query.toLowerCase();

  return posts.filter((post) => {
    const { title, languages, categories } = post;
    const postTitle = title.toLowerCase();

    if (languages.includes(searchQuery) || categories.includes(searchQuery))
      return true;
    if (calculateTolerance(postTitle, searchQuery)) return true;

    return false;
  });
}
