<script>
  import { twMerge } from 'tailwind-merge';
  import { removeToast } from '$lib/stores';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const { toast } = $props();
  toast.type = toast.type || 'gray';
  const baseToastClasses = 'rounded border-l-4 p-4 relative';
  const toastColors = {
    red: 'border-red-500 bg-red-50 text-red-800',
    green: 'border-green-500 bg-green-50 text-green-800',
    gray: 'border-neutral-500 bg-neutral-50 text-neutral-800',
  };
  const toastTextColors = {
    red: 'text-red-700',
    green: 'text-green-700',
    gray: 'text-neutral-700',
  };
  const toastClasses = twMerge(baseToastClasses, toastColors[toast.type]);
</script>

<div
  role="alert"
  class={toastClasses}
  transition:fly={{
    y: 20,
    duration: 150,
    easing: quintOut,
  }}
>
  <div class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="h-5 w-5"
    >
      {#if toast.type === 'red'}
        <path
          fill-rule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clip-rule="evenodd"
        />
      {:else if toast.type === 'green'}
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clip-rule="evenodd"
        />
      {:else}
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clip-rule="evenodd"
        />
      {/if}
    </svg>

    <strong class="block font-medium">{toast.title}</strong>
  </div>

  <p class="mt-2 text-sm {toastTextColors[toast.type]}">
    {@html toast.message}
  </p>
  <button class="absolute top-2 right-2" on:click={() => removeToast(toast.index)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</div>
