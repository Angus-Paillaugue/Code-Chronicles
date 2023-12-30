import { postsRef } from '$lib/server/db';

export const load = async ({ url }) => {
    const searchQuery = new RegExp( url.searchParams.get("query") || ".*", 'i' );

    const posts = await postsRef.find({ $or:[{ languages:{$in:[searchQuery]} }, { categories:{$in:[searchQuery]} }, { title:searchQuery }] }).project({ _id:0 }).toArray();
    
    return { posts };
};