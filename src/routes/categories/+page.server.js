import { postsRef } from '$lib/server/db';

export const load = async ({  }) => {
    let posts = await postsRef.find({  }).project({ _id:0 }).toArray();
    
    const postsByCategory = {};
    posts.forEach(post => {
        post.categories.forEach(category => {
            if (!postsByCategory[category]) {
                postsByCategory[category] = [];
            }
            postsByCategory[category].push(post);
        });
    });
    
    return { posts:postsByCategory };
};