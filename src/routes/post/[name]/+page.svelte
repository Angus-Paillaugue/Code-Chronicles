<script>
  import { onMount } from 'svelte';
  import { formatDate } from '$lib/utils';
  import { newToast } from '$lib/stores';
  import { replaceState } from '$app/navigation';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LanguageIcon } from '$lib/components/';
  import { page } from '$app/stores';

  const { data } = $props();
  const { post } = data;
  const scrollOffset = 200;
  let article = $state();
  let scrollPos = $state(0);
  let articleHeight = $state(0);
  let screenHeight = $state(0);
  let sideTOC = $state();
  let sideTOCHidden = $state(false);
  let sideTOCPillBg = $state();

  onMount(() => {
    if (article.querySelector('ol:first-child')) {
      // Add padding recursively to nested sections (ex: 1.1, 4.2.1, etc.)
      article
        .querySelector('ol:first-child')
        .querySelectorAll('ol')
        .forEach((el) => {
          el.classList.add('pl-6');
        });
      // Clone the table of contents (TOC) and add it to the side TOC
      const toc = article.querySelector('ol:first-child').cloneNode(true);
      // Add classes to the cloned TOC
      toc.classList.add('side-toc');
      // Add styling to the side TOC items
      toc.querySelectorAll('li').forEach((el) => {
        el.classList.add('m-0', 'w-fit');
      });
      toc.querySelectorAll('li>a').forEach((el) => {
        el.classList.add(
          'm-0',
          'no-underline',
          'cursor-pointer',
          'transition-all',
          'hover:underline'
        );
      });
      // Adds the side TOC to the DOM
      sideTOC.querySelector('.relative').appendChild(toc);
      // Hide the main TOC greater than small screens
      article.querySelector('ol:first-child').classList.add('lg:hidden');
      // On scroll, highlight the current section in the side TOC
      onscroll = () => {
        scrollPos = window.scrollY + 96;
        setTOCPill();
      };
      setScreenRelatedValues();
      setTOCPill();
      onresize = setScreenRelatedValues;
    } else {
      // Remove the side TOC if there is no TOC
      sideTOC.remove();
    }

    // Add classes to the heading elements
    const headings = article.querySelectorAll('h1,h2,h3,h4,h5,h6');
    headings.forEach((heading) => {
      heading.classList.add('article-heading');
    });
    // Add classes to the paragraph elements
    const paragraphs = article.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
      paragraph.classList.add('article-text');
    });
    // Add classes to the TOC line elements
    const tocLine = article.querySelectorAll('ol>li');
    tocLine.forEach((el) => {
      el.classList.add('toc');
    });
    // Add MacOs buttons to the code block title
    const codeBlockTitles = article.querySelectorAll('.remark-code-title');
    codeBlockTitles.forEach((el) => {
      const buttonContainers = document.createElement('div');
      buttonContainers.innerHTML = `
        <div class="w-4 h-4 rounded-full bg-[#fd5754] text-[#9b1f2a] border border-[#d52735] group flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 transition-all group-hover:opacity-100 opacity-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>  
        </div>
        <div class="w-4 h-4 rounded-full bg-[#34c848] text-[#077908] border border-[#13c11e] group flex flex-col items-center justify-center">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-all group-hover:opacity-100 opacity-0" viewBox="10 10 320 320" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0,357) scale(0.1,-0.1)"
            fill="currentColor" stroke="none">
              <path d="M1995 2010 l690 -690 3 112 c1 62 1 327 0 588 l-3 475 -27 51 c-31 59 -73 98 -138 128 -44 20 -61 21 -630 24 l-585 3 690 -691z"/>
              <path d="M890 1674 l0 -590 26 -52 c14 -29 44 -68 66 -87 78 -66 69 -65 711 -63 l577 3 -690 690 -690 690 0 -591z"/>
            </g>
          </svg>  
        </div>
        <div class="w-4 h-4 rounded-full bg-[#febb40] text-[#995817] border border-[#da9e10] group flex flex-col items-center justify-center">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-all group-hover:opacity-100 opacity-0" viewBox="10 10 320 320" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0,357) scale(0.1,-0.1)"
            fill="currentColor" stroke="none">
              <path d="M684 1920 c-27 -11 -72 -65 -80 -96 -9 -36 2 -94 24 -123 10 -13 33 -32 52 -42 33 -18 82 -19 1103 -19 966 0 1072 2 1103 16 92 44 109 167 33 240 l-30 29 -1092 2 c-601 1 -1101 -2 -1113 -7z"/>
            </g>
          </svg>
        </div>
      `;
      buttonContainers.classList.add('flex', 'flex-row', 'gap-1');
      el.prepend(buttonContainers);
    });

    // Code blocks
    const code = article.querySelectorAll('pre');
    code.forEach((el) => {
      // Creating copy code button
      const copyButton = document.createElement('button');
      copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="max-w-[1.5rem] max-h-[1.5rem] h-full w-full copy"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 copied hidden"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
      copyButton.classList.add('copy-code-button');
      copyButton.name = 'copy-code';

      // On copy code button click
      copyButton.onclick = () => {
        // Change the button icon to a checkmark
        copyButton.querySelector('.copy').classList.add('hidden');
        copyButton.querySelector('.copied').classList.remove('hidden');
        const textToCopy = el.querySelector('pre>code').innerText;
        // Write the code to clipboard
        navigator.clipboard.writeText(textToCopy);
        // Show toast
        newToast({
          title: 'Copied to clipboard',
          message: 'The code has been copied to your clipboard',
          type: 'green',
        });
        setTimeout(() => {
          // Reset the button icon back to default
          copyButton.querySelector('.copy').classList.remove('hidden');
          copyButton.querySelector('.copied').classList.add('hidden');
        }, 2000);
      };
      el.appendChild(copyButton);
    });
  });

  function setTOCPill() {
    const sections = Array.from(article.querySelectorAll('h1,h2,h3,h4,h5,h6'));

    // For each section of the blog post
    for (let i in sections) {
      const section = sections[i];
      // Get the section's position
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      // If the section is the active one
      if (top <= scrollPos + scrollOffset) {
        if (
          (Number(i) < sections.length - 1 &&
            sections[Number(i) + 1]?.offsetTop > scrollPos + scrollOffset) ||
          Number(i) === sections.length - 1
        ) {
          // Get the active section link in the side TOC
          const activeSectionLink = sideTOC.querySelector(
            `a[href='#${section.id}']`
          );
          // Get the active section link in the URL
          const activeURLSection = window.location.href.split('#').at(-1);

          // If the active section link in the URL is not the same as the active section link in the side TOC (user scrolled to a different section)
          if (activeURLSection !== activeSectionLink.href.split('#').at(-1)) {
            // Moving the pill background to the active section
            sideTOCPillBg.style.top = `${
              activeSectionLink.parentElement.offsetTop - 4
            }px`;
            sideTOCPillBg.style.height = `${
              activeSectionLink.offsetHeight + 2 * 5
            }px`;

            // Replace the URL hash with the current section ID
            replaceState(window.location.href.split('#')[0] + '#' + section.id);

            // Scroll the side TOC to the active section
            let lastPos = scrollPos;
            let interval = setInterval(() => {
              if (lastPos === scrollPos) {
                sideTOC.scrollTop =
                  activeSectionLink.parentElement.offsetTop -
                  sideTOC.clientHeight / 2 +
                  activeSectionLink.offsetHeight / 2;
                clearInterval(interval);
              } else lastPos = scrollPos;
            }, 50);

            break;
          }
        }
      }
    }
    // If the user scrolled to the top of the page (no active section), remove the URL hash
    if (
      window.location.href.split('#').length === 2 &&
      scrollPos < screenHeight
    )
      replaceState(window.location.href.split('#')[0]);
  }

  // Set the screen height and article height
  const setScreenRelatedValues = () => {
    screenHeight = window.innerHeight;
    articleHeight = article.clientHeight;
  };

  // On toggle of the side TOC, add/remove padding to the side TOC to hide or show the text
  $effect(() => {
    if (article.querySelector('ol:first-child')) {
      const toc = sideTOC.querySelector('ol');
      if (sideTOCHidden) {
        toc.classList.add('pl-12');
        sideTOCPillBg.style.left = `64px`;
      } else {
        toc.classList.remove('pl-12');
        sideTOCPillBg.style.left = `8px`;
      }
    }
  });
</script>

<!-- SEO -->
<svelte:head>
  <!-- Normal tags -->
  <title>{post.title} | Code-Chronicles</title>
  <meta
    property="description"
    content={post.title + ' | ' + post.description}
  />

  <!-- Open Graph tags -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post.title + '| Code Chronicle'} />
  <meta
    property="og:description"
    content={post.title + ' | ' + post.description}
  />
  <meta property="og:image" content={$page.url.origin + post.banner} />
  <meta
    property="og:image:type"
    content={'image/' + post.banner.split('.').at(-1)}
  />
  <meta
    property="article:published_time"
    content={new Date(post.date).toISOString()}
  />

  <!-- Twitter / X tags -->
  <meta property="twitter:title" content={post.title + '| Code Chronicle'} />
  <meta
    property="twitter:description"
    content={post.title + ' | ' + post.description}
  />
  <meta property="twitter:image" content={$page.url.origin + post.banner} />
  <meta property="twitter:card" content="summary" />
</svelte:head>

<!-- Scroll activated elements -->

{#if scrollPos > screenHeight}
  <!-- Back To Top Button -->

  <button
    class="fixed bottom-2 right-2 md:bottom-4 md:right-4 w-10 h-10 z-10 rounded-full flex flex-col items-center justify-center transition bg-black-primary text-white hover:scale-105 active:scale-90"
    transition:fly={{
      y: 20,
      duration: 150,
      easing: quintOut,
    }}
    onclick={() => {
      replaceState(window.location.href.split('#')[0]);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }}
    name="backToTop"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
      />
    </svg>
  </button>

  <!-- Reading Progress Bar -->

  <div
    class="fixed top-20 z-10 left-0 h-2 right-0 bg-white border-t border-border"
    transition:fly={{
      y: '100%',
      duration: 150,
      easing: quintOut,
    }}
  >
    <div
      class="bg-black-primary h-full"
      style="width: {articleHeight > 0
        ? ((scrollPos - screenHeight) /
            (articleHeight + screenHeight - scrollOffset)) *
          100
        : 0}%"
    ></div>
  </div>
{/if}

<!-- Side Table Of Contents (TOC) -->

<div
  class="fixed top-1/2 -translate-y-1/2 right-0 z-10 rounded-l-3xl bg-white border border-border border-r-0 transition-all duration-500 max-h-[500px] overflow-x-hidden overflow-y-auto sideTocContainer {(
    scrollPos - screenHeight < 0 ? 0 : scrollPos - screenHeight
  )
    ? sideTOCHidden
      ? 'lg:translate-x-full mr-16 max-w-[calc(275px+64px)]'
      : 'lg:translate-x-0 max-w-[275px]'
    : 'lg:translate-x-full max-w-[275px]'} max-lg:translate-x-full"
  bind:this={sideTOC}
  style="direction: ltr;"
>
  <div class="sticky top-0 z-20 bg-white p-2">
    <button
      name="toggleTableOfContents"
      onclick={() => (sideTOCHidden = !sideTOCHidden)}
      class="w-10 h-10 flex flex-col items-center justify-center bg-neutral-100 hover:bg-neutral-200 transition-all rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 transition-all duration-500 {sideTOCHidden &&
          'rotate-180'}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
  <div class="w-full h-full relative p-4 pt-2">
    <!-- Pill background -->
    <span
      class="absolute -z-10 bg-neutral-200 left-2 right-2 transition-all ease-linear rounded-3xl"
      bind:this={sideTOCPillBg}
    ></span>
  </div>
</div>

<div class="max-w-[900px] mx-auto w-full mt-5">
  <div class="border-[1px] border-border rounded-3xl mb-10 overflow-hidden">
    <img
      src={post.banner}
      alt="Post banner"
      class="post-cover h-full max-h-[500px] mx-auto"
      data-flip-id="post-cover-img-{post.title.split(' ').join('-')}"
    />
    <div class="p-4">
      <h1
        class="post-title mt-4"
        data-flip-id="post-title-{post.title.split(' ').join('-')}"
      >
        {post.title}
      </h1>

      <time
        datetime={new Date(post.date).toLocaleDateString()}
        class="block text-xs text-black-primary/60 post-date"
        data-flip-id="post-date-{post.title.split(' ').join('-')}"
        >{formatDate(new Date(post.date), 'long')}</time
      >

      <p class="mt-1 text-lg">
        {post.description}
      </p>

      {#if post?.languages}
        <h5 class="mt-4 text-sm">Tech stack used :</h5>
        <div
          class="grid gap-2"
          style="grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));"
        >
          {#each post.languages as language}
            <a
              href="/languages/{language}"
              data-tooltip={language}
              class="tech-stack"
              data-flip-id="post-tech-stack-{post.title.split(' ').join('-') +
                '-' +
                language}"
            >
              <LanguageIcon {language} />
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <article
    class="p-4 border border-border overflow-hidden rounded-3xl"
    bind:this={article}
  >
    <svelte:component this={data.component} />
  </article>
</div>
