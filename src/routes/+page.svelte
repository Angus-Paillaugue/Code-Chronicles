<script>
  import { ButtonPrimary, LanguageIcon, Slider } from '$lib/components/';

  const { data } = $props();
  const { topLanguages, mostRecentPosts } = data;
  const theme = 'light';
</script>

<svelte:head>
  <title>Home | Code Chronicle</title>
  <meta property="og:title" content="Home | Code Chronicle" />
  <meta property="twitter:title" content="Home | Code Chronicle" />

  <meta
    name="description"
    content="On this blog, you will find all the ressources you need to be the greatest developer in the world."
  />
  <meta
    property="og:description"
    content="On this blog, you will find all the ressources you need to be the greatest developer in the world."
  />
  <meta
    property="twitter:description"
    content="On this blog, you will find all the ressources you need to be the greatest developer in the world."
  />
</svelte:head>

<section
  class="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
>
  <div
    class="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right"
  >
    <h2 class="text-3xl font-bold sm:text-4xl">Start learning today!</h2>

    <p class="mt-4 text-gray-600">
      On this blog, you will find all the ressources you need to be the greatest
      developer in the world.
    </p>

    <ButtonPrimary href="/categories">Get Started Today</ButtonPrimary>
  </div>

  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
    {#each topLanguages as language}
      <a
        class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring transition-all"
        href="/languages/{language}"
      >
        <LanguageIcon {language} {theme} class="w-10 h-10" />

        <h2 class="mt-2 font-bold">
          {language}
        </h2>

        <p class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
          All the
          {language}
          related articles
        </p>
      </a>
    {/each}
  </div>
</section>

<section
  class="max-w-screen-xl mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
>
  <h2>Most recent posts :</h2>
  <Slider posts={mostRecentPosts} />
</section>
