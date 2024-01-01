<script>
  import { twMerge } from 'tailwind-merge';
  import languages from '$lib/utils/languages.json';

  let { language, theme, class: classes } = $props();
  theme ??= 'light';

  const icon = languages.find((lang) => lang.name == language)?.icons[theme] ?? 'Javascript.svg';

  const iconsClasses = twMerge('drop-shadow-md w-10 h-10', classes);
</script>

<img src="/icons/{icon}" alt="{language} icon" class={iconsClasses} />
