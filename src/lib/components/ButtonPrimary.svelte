<script>
    import { twMerge } from 'tailwind-merge';

    let { onclick, children, class: classname, href, ...attributes } = $props();
    const buttonClasses = twMerge(
        'bg-black-primary text-white border border-black-primary hover:bg-transparent rounded-md hover:text-black-primary transition-all text-center p-2 min-w-32 inline-block relative text-base font-bold active:scale-95 cursor-pointer',
        classname
    );
</script>

{#if href}
    <a 
        class={buttonClasses}
        {href}
        {...attributes}
    >
        {@render children()}
    </a>
{:else}
    <button 
        class={buttonClasses}
        {onclick}
        {...attributes}
    >
        {@render children()}
    </button>
{/if}