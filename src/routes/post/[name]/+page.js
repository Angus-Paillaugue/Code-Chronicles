export async function load({ data }) {
  const component = await import(`../../../posts/${data.post.slug}.md`);

  return {
    component: component.default,
    ...data,
  };
}
