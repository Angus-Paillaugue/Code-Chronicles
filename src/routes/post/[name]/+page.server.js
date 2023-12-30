import { error } from '@sveltejs/kit';
import { postsRef } from '$lib/server/db';

export const load = async ({ params }) => {
    const { name } = params;
    const post = structuredClone(await postsRef.findOne({ fileName:name }));
    
    if (!post) throw error(404, 'Post not found');
    
    return { post }
};