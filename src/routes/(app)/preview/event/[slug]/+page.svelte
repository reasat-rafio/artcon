<script lang="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import Asset from '@/components/common/hero/Asset.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { EventPreviewProps } from '@/lib/types/event-preview';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let data: PageProps<EventPreviewProps>;
  $: ({
    page: {
      name,
      description,
      gallery,
      startDate,
      endDate,
      seo,
      slug,
      sliderImageVideo,
      asset,
      tag,
      subtitle,
    },
    site: { logos },
  } = data);
  let transitioningOut = false;
  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let innerWidth = 0;

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

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
    }
  });
</script>

<Seo {seo} siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: `/event/${slug.current}`, title: 'EXPLORE' },
  ]} />
<section>
  <MobileImage {sliderImageVideo} />

  <article bind:this={articleEl} class="preview_container">
    <DesktopImage {sliderImageVideo} />

    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={() => (transitioningOut = false)}
          out:fade={{ duration: 500 }}
          class="preview_content_container">
          <NavigationMobile
            cta={{
              href: `/event/${slug.current}`,
              title: 'EXPLORE',
            }} />

          <Header let:Info topic="Our event" title={subtitle ? `${name} / ${subtitle}` : name} type={tag.name}>
            <Info>
              <div class="title-light">
                {#if gallery.url || (gallery.location && (gallery.location.startsWith('http://') || gallery.location.startsWith('https://')))}
                  <a
                    href={gallery.url || gallery.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline">
                    {gallery.name}
                  </a>
                {:else}
                  {gallery.name}
                {/if}
              </div>
              <div class="sub-title-light mt-1">
                <span class="font-light">{date}</span>
                <span class="px-[3px]">|</span>
                <span class="!font-medium text-eerie-black">{status}</span>
              </div>
            </Info>
          </Header>

          <div
            data-load-animate="y"
            class="relative mb-[2.5rem] aspect-video w-full overflow-hidden rounded-[25px] sm:h-full">
            <Asset {asset} />
          </div>

          {#if !!description?.length}
            <div data-load-animate="y">
              <PortableText
                class="body-light-m lg:body-light text-dark-gunmetal"
                value={description} />
            </div>
          {/if}
        </div>
      {/key}
    </section>
  </article>
</section>
