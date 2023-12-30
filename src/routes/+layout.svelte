<script>
    import "../app.css";
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { gsap } from 'gsap/dist/gsap';
	import { Flip } from 'gsap/dist/Flip';
    import { CookieModal, Footer, NavBar, Toast } from "$lib/components";
    import { toasts } from "$lib/stores";

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

<!-- Toasts -->
<div class="fixed top-20 right-0 p-2 lg:p-4 flex flex-col gap-2 z-20 max-h-[100vh-5rem] max-w-[500px] w-full">
    {#each $toasts.reverse().slice(0, 4) as toast}
        <Toast {toast} />
    {/each}
</div>

<CookieModal />

<div class="min-h-screen flex flex-col w-full overflow-x-hidden">
    <NavBar />

    
    <div class="grow flex flex-col">
        <slot />
    </div>
    
    <Footer />
</div>