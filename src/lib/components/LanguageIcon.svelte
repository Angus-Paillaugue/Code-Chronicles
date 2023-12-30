<script>
    import languages from "$lib/languages.json";
    import { twMerge } from "tailwind-merge";

    const { language, theme, class:classes } = $props();

    const iconsClasses = twMerge(
        "drop-shadow-md w-10 h-10",
        classes
    );
</script>

<img
    src="/icons/{languages.find((lang) => lang.name == language).icons[
        theme
    ]}"
    alt="{language} icon"
    class={iconsClasses}
    
/>