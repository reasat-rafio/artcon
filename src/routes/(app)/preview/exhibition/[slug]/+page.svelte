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
  import type { ExhibitionPreviewProps } from '@/lib/types/exhibition-preview';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  export let data: PageProps<ExhibitionPreviewProps>;
  $: ({
    page: {
      name,
      description,
      gallery,
      startDate,
      endDate,
      seo,
      topTitle,
      subtitle,
      slug,
      sliderImageVideo,
      asset,
      exhibitionType,
    },
    site: { logos },
  } = data);

  let transitioningOut = false;
  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let innerWidth = 0;

  $: isSoloExhibition = typeof exhibitionType !== 'string';
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
    { href: `/exhibition/${slug.current}`, title: 'Exhibition' },
  ]} />
<section>
  <MobileImage {sliderImageVideo} />

  <article bind:this={articleEl} class="preview_container">
    <DesktopImage {sliderImageVideo} />

    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={() => (transitioningOut = false)}
          class="preview_content_container">
          <NavigationMobile
            cta={{
              href: `/exhibition/${slug.current}`,
              title: 'Exhibition',
            }} />

          <Header
            let:Info
            topic="Our exhibition"
            title={name}
            subtitle={!!subtitle
              ? subtitle
              : typeof exhibitionType === 'string'
                ? exhibitionType
                : exhibitionType.en}
            type={!!topTitle
              ? topTitle
              : isSoloExhibition
                ? 'Solo Exhibition'
                : 'Group Exhibition'}>
            <Info>
              {@const galleryUrl = gallery.url || (gallery.location?.startsWith('http') ? gallery.location : null)}
              {#if galleryUrl}
                <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer hover:underline">
                  <div class="title-light">
                    {gallery.name}
                  </div>
                </a>
              {:else}
                <div class="title-light">
                  {gallery.name}
                </div>
              {/if}
              <div class="sub-title-light !font-inter">
                <span class="font-light">{date}</span>
                <span class="px-[3px] text-eerie-black/50">|</span>
                <span class="font-medium text-eerie-black">{status}</span>
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
