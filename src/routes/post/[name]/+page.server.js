import { error } from '@sveltejs/kit';
import { postBySlug } from '$lib/server/posts';

export const load = async ({ params }) => {
    const { name } = params;
    const post = postBySlug(name);
    
    if (!post) throw error(404, 'Post not found');
    
    return { post }
};