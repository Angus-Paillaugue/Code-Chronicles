<script>
  import '../app.css';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { gsap } from 'gsap/dist/gsap';
  import { Flip } from 'gsap/dist/Flip';
  import { CookieModal, Footer, NavBar, Toasts, Analytics } from '$lib/components';
  import { page } from '$app/stores';

  gsap.registerPlugin(Flip);
  let state = $state();

  beforeNavigate(async () => {
    state = Flip.getState('.post-cover, .post-title, .tech-stack, .post-date');
  });

  afterNavigate(async () => {
    Flip.from(state, {
      targets: '.post-cover, .post-title, .tech-stack, .post-date',
      duration: 0.2,
      scale: true,
      ease: 'power1.easeOut',
    });
  });
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href.split('#')[0]} />
  <meta property="twitter:domain" content={$page.url.hostname} />
  <meta property="twitter:url" content={$page.url.href.split('#')[0]} />

  <meta property="og:url" content={$page.url.href.split('#')[0]} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content="Code Chronicles" />
</svelte:head>

<!-- Toasts -->
<Toasts />

<CookieModal />

<Analytics />

<div class="min-h-screen flex flex-col w-full overflow-x-hidden">
  <NavBar />

  <div class="grow flex flex-col">
    <slot />
  </div>

  <Footer />
</div>
