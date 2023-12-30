<script>
    import { twMerge } from 'tailwind-merge';

    const { onclick, children, class: classname, ...attributes } = $props();
    const buttonClasses = twMerge(
        'bg-transparent text-black-primary border border-black-primary hover:bg-black-primary rounded-md hover:text-white transition-all text-center p-2 min-w-32 inline-block relative text-base font-bold active:scale-95',
        classname
    );
</script>

<button 
    class={buttonClasses}
    {onclick}
    {...attributes}
>
    {@render children()}
</button>