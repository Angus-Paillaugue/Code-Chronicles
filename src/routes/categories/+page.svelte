<script>
    import { Post } from "$lib/components/";
    import Input from "../../lib/components/Input.svelte";
    
    const { data } = $props();
    let posts = $state(data.posts);
    let searchInputValue = $state("");
    const theme = "light";

    $effect(() => {
        posts = data.posts;
    });

    $effect(() => {
        const tolerance = 1;
        // Filter the posts based on searchInputValue and object's keys
        posts = Object.fromEntries(
            Object.entries(data.posts).filter(([category, _]) => {
                const categoryLowerCase = category.toLowerCase();
                const searchInputValueLowerCase = searchInputValue.toLowerCase();
                let mismatchCount = 0;

                for (let i = 0; i < searchInputValueLowerCase.length; i++) {
                    if (categoryLowerCase[i] !== searchInputValueLowerCase[i]) mismatchCount++;

                    if (mismatchCount > tolerance) return false;
                }

                return true;
            })
        );
    });
</script>

<svelte:head>
    <title>Categories | Code Chronicle</title>
</svelte:head>

<div class="max-w-screen-xl mx-auto w-full p-2 md:p-4 lg:p-6">
    <Input placeholder="Search for languages" name="searchForLanguages" class="mb-6" bind:value={searchInputValue} />
    {#each Object.entries(posts) as [category, postsInCategory]}
        <div class="pb-2 md:pb-4 lg:pb-6">
            <h2>{category}</h2>
            <div class="grid gap-4" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
                {#each postsInCategory as post}
                    <Post {post} {theme}/>
                {/each}
            </div>
        </div>
    {/each}
</div>