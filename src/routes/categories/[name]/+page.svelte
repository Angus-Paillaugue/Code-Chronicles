<script>
  import { page } from '$app/stores';
  import { Post } from '$lib/components/';

  const { data } = $props();
  let posts = $state(data.posts);
  const theme = 'light';

  $effect(() => {
    posts = data.posts;
  });
</script>

<svelte:head>
  <title>{$page.params.name} | Code Chronicle</title>
  <meta property="og:title" content="{$page.params.name} | Code Chronicle" />
  <meta
    property="twitter:title"
    content="{$page.params.name} | Code Chronicle"
  />

  <meta
    name="description"
    content="All the blog posts in the {$page.params.name} category"
  />
  <meta
    property="og:description"
    content="All the blog posts in the {$page.params.name} category"
  />
  <meta
    property="twitter:description"
    content="All the blog posts in the {$page.params.name} category"
  />
</svelte:head>

<div class="max-w-screen-xl mx-auto w-full p-2 md:p-4 lg:p-6">
  {#if posts.length > 0}
    <h2 class="capitalize">
      {$page.params.name}
      posts
    </h2>
    <div
      class="grid gap-4"
      style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));"
    >
      {#each posts as post (post.id)}
        <Post {post} {theme} />
      {/each}
    </div>
  {:else}
    <h2 class="px-2">
      No post related to "{$page.params.name}"
    </h2>
  {/if}
</div>
