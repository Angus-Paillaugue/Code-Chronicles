import { postsRef } from '$lib/server/db';

export const load = async ({ params }) => {
    const { name } = params;
    const posts = await postsRef.find({ languages:{$in:[name]} }).project({ _id:0 }).toArray();
    
    return { posts };
};