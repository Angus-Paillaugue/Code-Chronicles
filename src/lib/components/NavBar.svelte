<script>
  import { afterNavigate } from '$app/navigation';
  // import { onMount } from "svelte";
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Input, LanguageIcon } from '$lib/components/';
  import { page } from '$app/stores';

  let searchModal = $state(false);
  // let recognition;
  // let searchInputValue = $state("");
  // let lang;
  // let doesNotSupportSpeech = $state(false);
  let mobileNavBar = $state(false);
  let navbarDropdown = $state(false);
  const theme = 'light';

  $effect(() => {
    searchModal = searchModal;
    setTimeout(() => {
      if (searchModal) document.getElementsByName('query')[0].focus();
    }, 150);
  });

  // onMount(() => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;
  //   if (SpeechRecognition) doesNotSupportSpeech = false;
  //   else {
  //     recognition = new SpeechRecognition();
  //     lang = window.navigator.language;
  //   }
  // });

  afterNavigate(() => {
    searchModal = false;
    mobileNavBar = false;
    navbarDropdown = false;
  });

  // const handleInput = (event) => {
  //   searchInputValue = event.target.value;
  // };

  // function handleVoiceBtn() {
  //   recognition.continuous = true;
  //   recognition.lang = lang;
  //   recognition.start();
  //   recognition.addEventListener("result", (event) => {
  //     const transcript = event.results[event.resultIndex][0].transcript.trim();
  //     searchInputValue = transcript;
  //   });
  // }
</script>

<div class="h-20"></div>

<header class="bg-white fixed top-0 left-0 right-0 h-20 z-40">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <img class="h-8 w-auto" src="/logo-rectangular.webp" alt="Code Chronicle logo" />
      </a>
    </div>
    <div class="flex lg:hidden">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black-primary"
        onclick={() => (mobileNavBar = true)}
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
      <div class="relative">
        <button
          type="button"
          class="flex items-center gap-x-1 text-sm font-semibold leading-6 peer text-black-primary"
        >
          Languages
          <svg
            class="h-5 w-5 flex-none text-black-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Desktop dropdown -->
        <div
          class="absolute -left-8 top-full w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg border border-border/5 transition-[transform,_opacity,_visibility] -z-10 opacity-0 translate-y-1 invisible peer-hover:z-40 peer-focus:z-40 hover:z-40 focus:z-40 peer-hover:translate-y-0 peer-focus:translate-y-0 focus:translate-y-0 hover:translate-y-0 peer-hover:opacity-100 peer-focus:opacity-100 focus:opacity-100 hover:opacity-100 peer-hover:visible peer-focus:visible hover:visible focus:visible"
        >
          <div class="p-4">
            {#each $page.data.topLanguages as language}
              <a
                href="/languages/{language}"
                class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div
                  class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                >
                  <LanguageIcon {language} {theme} class="w-6 h-6" />
                </div>
                <div class="flex-auto">
                  <div class="block font-semibold text-black-primary">
                    {language}
                    <span class="absolute inset-0"></span>
                  </div>
                  <p class="mt-1 text-gray-600">
                    All
                    {language}
                    related articles
                  </p>
                </div>
              </a>
            {/each}
          </div>
          <div class="flex flex-row">
            <a
              href="/languages"
              class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-black-primary bg-gray-100 transition-all group hover:bg-border w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 flex-none text-gray-400 transition-all group-hover:text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                />
              </svg>
              All Languages
            </a>
          </div>
        </div>
      </div>

      <a
        href="/categories/front-end"
        class="text-sm font-semibold leading-6 text-black-primary">Front-end</a
      >
      <a
        href="/categories/back-end"
        class="text-sm font-semibold leading-6 text-black-primary">Back-end</a
      >
      <a
        href="/categories/others"
        class="text-sm font-semibold leading-6 text-black-primary">Others</a
      >
    </div>
    <div class="max-lg:hidden flex-1 flex justify-end">
      <button on:click={() => (searchModal = !searchModal)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 text-black-primary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Search modal, show/hide based on modal state. -->
  {#if searchModal}
    <div
      class="z-30 realtive fixed top-20 right-0 left-0 bottom-0"
      tabindex="-1"
      onclick={() => (searchModal = false)}
      transition:fly={{
        y: 20,
        duration: 300,
        easing: quintOut,
      }}
    >
      <div
        class="bg-white px-6 py-6 border-y border-border"
        role="dialog"
        aria-modal="true"
      >
        <form action="/search" method="GET" class="w-full relative">
          <Input name="query" placeholder="Search" />

          <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="submit" class="text-gray-600 hover:text-gray-700">
              <span class="sr-only">Search</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </form>
      </div>
    </div>
  {/if}

  <!-- Mobile menu, show/hide based on menu open state. -->
  <!-- Background backdrop -->
  {#if mobileNavBar}
    <div
      class="fixed inset-0 z-30 bg-neutral-700/30"
      onclick={() => (mobileNavBar = false)}
      transition:fade={{
        duration: 200,
      }}
    ></div>

    <div
      class="lg:hidden transition-[opacity,_visibility] z-40 top-0 fixed inset-y-0 right-0 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      role="dialog"
      aria-modal="true"
      transition:fly={{
        x: '100%',
        duration: 500,
      }}
    >
      <div class="flex flex-row justify-between items-center">
        <a href="/" class="rounded-full overflow-hidden"
          ><img src="/square-logo.webp" class="h-[44px]" alt="Code Chronicle logo" /></a
        >
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          onclick={() => (mobileNavBar = !mobileNavBar)}
        >
          <span class="sr-only">Close menu</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <div class="-mx-3">
              <button
                type="button"
                class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-black-primary hover:bg-gray-50 group"
                onclick={() => (navbarDropdown = !navbarDropdown)}
              >
                Languages
                <svg
                  class="h-5 w-5 flex-none {navbarDropdown &&
                    'rotate-180'} transition-all"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div
                class="space-y-2 {navbarDropdown
                  ? 'max-h-52 mt-2'
                  : 'max-h-0'} transition-all overflow-hidden"
              >
                {#each $page.data.topLanguages as language}
                  <a
                    href="/languages/{language}"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-black-primary hover:bg-gray-50"
                    >{language}</a
                  >
                {/each}
              </div>
            </div>
            <a
              href="/categories/front-end"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-primary hover:bg-gray-50"
              >Front-end</a
            >
            <a
              href="/categories/back-end"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-primary hover:bg-gray-50"
              >Back-end</a
            >
            <a
              href="/categories/others"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-primary hover:bg-gray-50"
              >Others</a
            >
            <button
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-primary hover:bg-gray-50 w-full text-start"
              onclick={() => {
                mobileNavBar = false;
                searchModal = true;
              }}>Search</button
            >
          </div>
        </div>
      </div>
    </div>
  {/if}
</header>
