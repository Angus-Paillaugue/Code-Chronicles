<script>
  import { onMount } from 'svelte';
  import ButtonPrimary from './ButtonPrimary.svelte';
  import ButtonSecondary from './ButtonSecondary.svelte';

  let cookieModal = false;

  onMount(() => {
    if (!localStorage?.acceptsCookies) cookieModal = true;
  });

  const acceptsCookies = (status = true) => {
    cookieModal = false;
    localStorage.setItem('acceptsCookies', status);
  };
</script>

<div
  class="{cookieModal ? 'bottom-2 lg:bottom-4' : 'bottom-0 translate-y-full'} 
        left-2 lg:left-4 right-2 lg:right-auto p-4 flex flex-col gap-normal
        rounded-md border border-black-primary z-50 transition-all duration-300 shadow-lg
        fixed max-w-lg bg-white"
>
  <div class="flex flex-col gap-2">
    <h2>We use cookies</h2>
    <div class="text-back-primary text-sm">
      We use cookies to improve your experience on our site and to show you personalised
      advertising.
    </div>
  </div>
  <div class="flex flex-col lg:flex-row gap-2 justify-end mt-2">
    <ButtonSecondary onclick={() => (cookieModal = false)}>Reject All</ButtonSecondary>
    <ButtonPrimary onclick={acceptsCookies}>Accept All</ButtonPrimary>
  </div>
</div>
