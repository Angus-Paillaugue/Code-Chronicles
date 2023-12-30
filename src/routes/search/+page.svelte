<script>
    import { page } from "$app/stores";
    import { Post } from "$lib/components/";
    
    const { data } = $props();
    let posts = $state(data.posts);
    const theme = "light";

    $effect(() => {
        posts = data.posts;
    });
</script>

<svelte:head>
    <title>{$page.url.searchParams.get("query")} | Code Chronicle</title>
</svelte:head>

<div class="max-w-screen-xl mx-auto w-full">
    {#if posts.length > 0}
        <h2 class="px-2 md:px-4 lg:px-6">Post matching "{$page.url.searchParams.get("query")}"</h2>
        <div class="grid p-2 md:p-4 lg:p-6 gap-4" style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));">
            {#each posts as post}
                <Post {post} {theme}/>
            {/each}
        </div>
    {:else}
        <h2 class="px-2">No post matching "{$page.url.searchParams.get("query")}"</h2>
    {/if}
</div>