<script>
  import { formatDate, urlHealer } from '$lib/utils';
  import { onMount } from 'svelte';
  import LanguageIcon from './LanguageIcon.svelte';
  import Siema from 'siema';

  const { posts } = $props();
  const theme = 'light';
  let siema = $state();

  onMount(() => {
    siema = new Siema({
      selector: '.siema',
      duration: 200,
      easing: 'ease-in-out',
      startIndex: 0,
      draggable: false,
      loop: true,
      rtl: false,
      perPage: {
        768: 2,
        1024: 3,
      },
      onInit: () => {},
      onChange: () => {},
    });
  });
</script>

<div class="relative max-w-screen-xl mx-auto rounded-3xl overflow-hidden">
  <div class="siema">
    {#each posts as post (post.id)}
      <a
        href="/post/{urlHealer.identifier.join(post.slug, post.id)}"
        class="relative block shadow group h-[300px]"
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
          class="relative pb-4 sm:pb-6 px-10 h-full flex flex-col justify-end"
        >
          <time
            datetime={new Date(post.date).toLocaleDateString()}
            class="block text-sm text-white/90 post-date"
            data-flip-id="post-date-{post.title.split(' ').join('-')}"
            >{formatDate(new Date(post.date))}</time
          >

          <h2
            class="post-title m-0 text-white"
            data-flip-id="post-title-{post.title.split(' ').join('-')}"
          >
            {post.title}
          </h2>

          <p class="mt-2 line-clamp-3 text-base/relaxed text-white/95">
            {post.description}
          </p>
          {#if post?.languages}
            <div
              class="grid gap-2"
              style="grid-template-columns: repeat(auto-fill, 2.5rem);"
            >
              {#each post.languages as language}
                <div
                  data-tooltip={language}
                  class="tech-stack tooltip-small w-10 h-10"
                  data-flip-id="post-tech-stack-{post.title
                    .split(' ')
                    .join('-') +
                    '-' +
                    language}"
                >
                  <LanguageIcon {language} {theme} class="w-full h-full" />
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </a>
    {/each}
  </div>
  <button
    class="absolute top-1/2 -translate-y-1/2 left-2 bg-neutral-700 p-0.5 text-gray-300 hover:bg-neutral-600 transition-all hover:scale-110 rounded-full active:scale-90"
    onclick={() => siema.prev()}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  </button>
  <button
    class="absolute top-1/2 -translate-y-1/2 right-2 bg-neutral-700 p-0.5 text-gray-300 hover:bg-neutral-600 transition-all hover:scale-110 rounded-full active:scale-90"
    onclick={() => siema.next()}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
</div>
