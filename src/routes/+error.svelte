<script>
  import { page } from '$app/stores';
  import { ButtonPrimary } from '$lib/components';
</script>

<svelte:head>
  <title
    >{$page.status}
    | Code Chronicle</title
  >
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
