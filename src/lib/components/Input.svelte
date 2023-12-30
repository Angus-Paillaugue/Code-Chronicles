<script>
  import { twMerge } from "tailwind-merge";

  let { name, class:extraClasses, placeholder, value, ...restProps } = $props();

  let classes = twMerge(
    "relative block rounded-md border border-gray-200 shadow-sm focus-within:border-black-primary focus-within:ring-1 focus-within:ring-black-primary",
    extraClasses
  );
</script>

<label
  for={name}
  class={classes}
  {...restProps}
>
  <input
    type="text"
    id={name}
    class="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2.5 px-4"
    {placeholder}
    name={name}
    autocomplete="off"
    bind:value
  />

  <span
    class="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
  >
    {placeholder}
  </span>
</label>
