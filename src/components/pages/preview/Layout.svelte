<script lang="ts">
  import type { Cta as CTAProps } from '@/lib/types/common.types';

  import NavigationDesktop from './NavigationDesktop.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import { beforeNavigate, goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import NavigationMobile from './NavigationMobile.svelte';

  export let ctas: [CTAProps, CTAProps];
  export let previewImage: SanityImageAssetDocument;

  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let transitioningOut = false;
  let onOutroEnd: () => void;

  onMount(() => {
    const animationNodes = contentEl.querySelectorAll('[data-load-animate]');
    const articleNodeHeight = articleEl.clientHeight;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
      });
      if (innerWidth >= 1024) {
        tl.to('#previewImage', { scale: 1.1, duration: 1 }).from(
          animationNodes,
          {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
          },
          0.3,
        );
      } else {
        tl.from(articleEl, { y: articleNodeHeight, duration: 1 }).from(
          animationNodes,
          {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
          },
          0.3,
        );
      }
    });
    return () => ctx.revert();
  });

  beforeNavigate(async (navigation) => {
    if (!transitioningOut) {
      transitioningOut = true;
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      if (innerWidth >= 1024) {
        tl.to(contentEl, { opacity: 0 }).to('#previewImage', {
          scale: 1,
          duration: 0.4,
        });
      } else {
        const articleNodeHeight = articleEl?.clientHeight;
        tl.to(contentEl, { opacity: 0 }).to(
          articleEl,
          {
            y: articleNodeHeight,
            duration: 0.4,
          },
          '-=0.4',
        );
      }

      navigation.cancel();

      onOutroEnd = async () => {
        await goto(navigation.to?.url.pathname as string);
        transitioningOut = false;
      };
    }
  });
</script>

<NavigationDesktop {ctas} />
<section>
  <div class="fixed inset-0 -z-10 block lg:hidden">
    <figure class="h-full w-full overflow-hidden">
      <SanityImage
        id="previewImage"
        class="h-full w-full object-cover"
        sizes="100vw"
        imageUrlBuilder={imageBuilder}
        src={previewImage}
        alt={previewImage.alt}
      />
    </figure>
  </div>

  <article
    bind:this={articleEl}
    class="flex h-screen w-full flex-col gap-[15px] bg-white max-lg:mt-[1.56rem] max-lg:rounded-t-[0.94rem] lg:flex-row"
  >
    <div class="max-lg:hidden lg:flex-[35%]">
      <figure class="h-full w-full overflow-hidden">
        <SanityImage
          id="previewImage"
          class="h-full w-full object-cover"
          sizes="50vw"
          imageUrlBuilder={imageBuilder}
          src={previewImage}
          alt={previewImage.alt}
        />
      </figure>
    </div>

    <section
      bind:this={contentEl}
      class="flex-[100%] overflow-scroll lg:flex-[65%]"
    >
      {#key transitioningOut}
        <div
          on:outroend={onOutroEnd}
          out:fade={{ duration: 500 }}
          class="space-y-[2.5rem] max-lg:container max-lg:pb-[3.5rem] lg:px-[4rem] lg:py-[6.063rem] xl:px-[5.438rem] 2xl:px-[8.438rem]"
        >
          <NavigationMobile cta={ctas[1]} />
          <slot />
        </div>
      {/key}
    </section>
  </article>
</section>
