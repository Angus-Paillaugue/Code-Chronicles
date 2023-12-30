import { postsRef } from '$lib/server/db';

export const load = async ({  }) => {
    let posts = await postsRef.find({  }).project({ _id:0 }).toArray();
    
    const postsByLanguage = {};
    posts.forEach(post => {
        post.languages.forEach(language => {
            if (!postsByLanguage[language]) {
                postsByLanguage[language] = [];
            }
            postsByLanguage[language].push(post);
        });
    });
    
    return { posts:postsByLanguage };
};