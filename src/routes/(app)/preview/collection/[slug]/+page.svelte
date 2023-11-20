<script lang="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import CollectionHeader from '@/components/pages/[preview]/CollectionHeader.svelte';
  import CollectionSlider from '@/components/pages/[preview]/CollectionSlider.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import Information from '@/components/pages/[preview]/Information.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import type { CollectionPreviewProps } from '@/lib/types/collection-preview.types';
  import type { PageProps } from '@/lib/types/common.types';
  import gsap from 'gsap';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let data: PageProps<CollectionPreviewProps>;
  $: ({
    page: {
      name,
      seo,
      slug,
      sliderImageVideo,
      artworkImages,
      inquiryButton,
      information,
      provenance,
      artist,
      isAvailable,
    },
    site: { logos },
  } = data);

  let onOutroEnd: () => void;
  let transitioningOut = false;
  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let innerWidth = 0;

  onMount(() => {
    const animationNodes = contentEl.querySelectorAll('[data-load-animate]');
    const articleNodeHeight = articleEl.clientHeight;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
      });
      if (innerWidth >= 1024) {
        tl.to('#previewImage', { scale: 1.25, duration: 1 }).from(
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
    if (navigation.to?.url.pathname !== '/') return;

    if (!transitioningOut) {
      transitioningOut = true;
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      if (innerWidth >= 1024) {
        tl.to('#previewImage', {
          scale: 1,
          duration: 0.4,
        }).to(contentEl, { opacity: 0 }, 0.1);
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

<Seo {seo} siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: `/collection/${slug.current}`, title: 'EXPLORE' },
  ]} />

<section>
  <MobileImage {sliderImageVideo} />
  <article bind:this={articleEl} class="preview_container">
    <DesktopImage {sliderImageVideo} />

    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={onOutroEnd}
          out:fade={{ duration: 500 }}
          class="preview_content_container">
          <NavigationMobile
            cta={{
              href: `/collection/${slug.current}`,
              title: 'EXPLORE',
            }} />

          <CollectionHeader
            {isAvailable}
            topic="Our collection"
            name={artist?.name || name}
            born={artist.born}
            country={artist.country} />

          <CollectionSlider {artworkImages} />
          <Information {name} {provenance} {information} {inquiryButton} />
        </div>
      {/key}
    </section>
  </article>
</section>
