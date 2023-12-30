<script>
    import { twMerge } from 'tailwind-merge';
    export let colorType = "default";
    export let classes = colorType == "gray" ? "button-border-gray hover:gap-4 w-fit" : colorType == "red" ? "button-red hover:gap-4 w-fit" : 'button-primary hover:gap-4 w-fit';
</script>
    
{#if $$restProps.href}
    <a {...$$restProps} href={$$restProps.href} class={twMerge(classes, $$props.class)} on:click>
        <slot />
    </a>
{:else}
    <button {...$$restProps} class={twMerge(classes, $$props.class)} on:click>
        <slot />
    </button>
{/if}