export async function load({ data }) {
  const component = await import(`../../../lib/posts/${data.post.slug}.md`);
  return {
    component: component.default,
    ...data,
  };
}