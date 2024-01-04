<script>
  import { onMount } from 'svelte';
  import Siema from 'siema';
  import Post from './Post.svelte';

  const { posts } = $props();
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
      <Post {post} class="rounded-none h-[300px]" />
    {/each}
  </div>
  <button
    class="absolute top-1/2 -translate-y-1/2 left-2 bg-neutral-700 p-0.5 text-gray-300 hover:bg-neutral-600 transition-all hover:scale-110 rounded-full active:scale-90"
    onclick={() => siema.prev()}
    name="Previous"
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
    name="Next"
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
