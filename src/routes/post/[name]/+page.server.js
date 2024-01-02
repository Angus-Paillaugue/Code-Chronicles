import { error, redirect } from '@sveltejs/kit';
import { postById, postBySlug } from '$lib/server/posts';
import { urlHealer } from '$lib/utils';

export const load = async ({ params }) => {
  const urlName = urlHealer.sanitize(params.name);

  // Isolate the identifier at the end of the URL
  const identifier = urlHealer.identifier.separate(urlName);
  if (!identifier) {
    throw error(404, 'Post not found');
  }

  // Fetch the post by its identifier
  let post;
  if (identifier.id) {
    post = postById(identifier.id);
  }
  // If the identifier is a slug, fetch the post by its slug
  if (!post) {
    post = await postBySlug(identifier.slug);
    if (!post) throw error(404, 'Post not found');
  }

  // Redirect to the correct URL if the slug is incorrect or is missing the identifier
  const correctUrl = urlHealer.identifier.join(post.slug, post.id);
  if (urlName !== correctUrl)
    throw redirect(307, `/post/${urlHealer.identifier.join(post.slug, post.id)}`);

  return {
    post,
  };
};
