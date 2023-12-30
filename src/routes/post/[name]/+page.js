export async function load({ params, data }) {
    const { name } = params;
    const component = await import(`../../../lib/posts/${name}.md`);
    return { component: component.default, ...data }
};