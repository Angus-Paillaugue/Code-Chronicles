<script>
  import { page } from '$app/stores';
  import { ButtonPrimary } from '$lib/components';
</script>

<svelte:head>
  <title>{$page.status} | Code Chronicle</title>
  <meta property="og:title" content="{$page.status} | Code Chronicle" />
  <meta property="twitter:title" content="{$page.status} | Code Chronicle" />

  <meta name="description" content="A {$page.status} error occurred : {$page.error.message}">
  <meta property="og:description" content="A {$page.status} error occurred : {$page.error.message}" />
  <meta property="twitter:description" content="A {$page.status} error occurred : {$page.error.message}" />
</svelte:head>

<div class="grid grow place-content-center bg-white px-4">
  <div class=" flex flex-col gap-10">
    <div class="uppercase tracking-widest text-gray-500">
      {$page.status}
      | {$page.error.message}
    </div>
    <ButtonPrimary href="/">Go Home</ButtonPrimary>
  </div>
</div>
