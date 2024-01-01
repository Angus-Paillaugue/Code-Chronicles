import { postsByLanguage } from '$lib/server/posts';

export const load = async ({ params }) => {
    const { name } = params;
    const posts = await postsByLanguage(name)
    
    return { posts };
};