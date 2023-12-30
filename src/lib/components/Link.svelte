<script>
    import { twMerge } from 'tailwind-merge';
    
    let { children, class: linkClasses, href, target, ...restProps } = $props();

    target = target || '_blank';

    const finalClasses = twMerge(
        'link',
        linkClasses
    );
</script>
    
<a  {...restProps} {href} {target} class={finalClasses}>
    {@render children()}
</a>