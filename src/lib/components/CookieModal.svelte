<script>
  import { onMount } from 'svelte';
  import { ButtonPrimary, ButtonSecondary } from '$lib/components';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  let cookieModal = false;

  onMount(() => {
    if (!localStorage?.acceptsCookies) cookieModal = true;
  });

  const acceptsCookies = (status = true) => {
    cookieModal = false;
    localStorage.setItem('acceptsCookies', status);
  };
</script>

{#if cookieModal}
  <div
    class="bottom-2 lg:bottom-4 left-2 lg:left-4 right-2 lg:right-auto p-4 flex flex-col gap-normal rounded-xl border border-black-primary z-50 shadow-lg fixed max-w-lg bg-white"
    in:fly={{ duration: 300, y: '100%', easing: quintOut, delay: 300 }}
    out:fly={{ duration: 300, y: '100%', easing: quintOut }}
  >
    <div class="flex flex-col gap-2">
      <h2>Someone said cookies</h2>
      <div class="text-back-primary text-sm">
        We use cookies to improve your experience on our site and to show you
        personalised advertising.
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-2 justify-end mt-2">
      <ButtonSecondary onclick={() => (cookieModal = false)}
        >Reject All</ButtonSecondary
      >
      <ButtonPrimary onclick={acceptsCookies}>Accept All</ButtonPrimary>
    </div>
  </div>
{/if}
