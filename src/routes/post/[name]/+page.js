export async function load({ data }) {
  // Since the path is dynamic, who knows what the name will be?
  const component = await import(/* @vite-ignore */`../../../lib/posts/${data.post.slug}.md`);
  
  return {
    component: component.default,
    ...data,
  };
}
