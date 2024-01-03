<script>
  import { formatDate } from '$lib/utils';
  import { urlHealer } from '$lib/utils';
  import LanguageIcon from './LanguageIcon.svelte';

  const { post, theme } = $props();
</script>

<a
  href="/post/{urlHealer.identifier.join(post.slug, post.id)}"
  class="relative overflow-hidden rounded-lg shadow group"
>
  <img
    src={post.banner}
    alt="Article cover"
    class="absolute inset-0 h-full w-full object-cover post-cover"
    data-flip-id="post-cover-img-{post.title.split(' ').join('-')}"
  />

  <div
    class="transition-all bg-gradient-to-t from-gray-900/50 to-gray-900/25 absolute inset-0 group-hover:bg-black-primary/60"
  ></div>
  <div
    class="relative px-4 pb-4 sm:pb-6 sm:px-6 pt-32 h-full flex flex-col justify-end"
  >
    <time
      datetime={new Date(post.date).toLocaleDateString()}
      class="block text-xs text-white/90 post-date"
      data-flip-id="post-date-{post.title.split(' ').join('-')}"
      >{formatDate(new Date(post.date))}</time
    >

    <h2
      class="post-title m-0 text-white"
      data-flip-id="post-title-{post.title.split(' ').join('-')}"
    >
      {post.title}
    </h2>

    <p class="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
      {post.description}
    </p>
    {#if post?.languages}
      <div
        class="grid gap-2"
        style="grid-template-columns: repeat(auto-fill, 2rem);"
      >
        {#each post.languages as language}
          <div
            data-tooltip={language}
            class="tech-stack tooltip-small"
            data-flip-id="post-tech-stack-{post.title.split(' ').join('-') +
              '-' +
              language}"
          >
            <LanguageIcon {language} {theme} class="w-8 h-8" />
          </div>
        {/each}
      </div>
    {/if}
  </div>
</a>
