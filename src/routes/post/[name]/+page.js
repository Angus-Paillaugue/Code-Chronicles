import getPostComponent from '$lib/posts';

export async function load({ data }) {
  const component = await getPostComponent(data.post.slug);

  return {
    component: component.default,
    ...data,
  };
}