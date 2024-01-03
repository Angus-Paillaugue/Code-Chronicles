<script>
  import { Post } from '$lib/components/';

  const { data } = $props();
  let posts = $state(data.posts);
  const theme = 'light';
</script>

<svelte:head>
  <title>Categories | Code Chronicle</title>
  <meta property="og:title" content="Categories | Code Chronicle" />
  <meta property="twitter:title" content="Categories | Code Chronicle" />

  <meta name="description" content="All the blog posts sorted by categories" />
  <meta
    property="og:description"
    content="All the blog posts sorted by categories"
  />
  <meta
    property="twitter:description"
    content="All the blog posts sorted by categories"
  />
</svelte:head>

<div class="max-w-screen-xl mx-auto w-full p-2 md:p-4 lg:p-6">
  {#each Object.entries(posts) as [category, postsInCategory]}
    <div class="pb-2 md:pb-4 lg:pb-6">
      <h2>
        {category}
      </h2>
      <div
        class="grid gap-4"
        style="grid-template-rows: min-content;grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));"
      >
        {#each postsInCategory as post}
          <Post {post} {theme} />
        {/each}
      </div>
    </div>
  {/each}
</div>
