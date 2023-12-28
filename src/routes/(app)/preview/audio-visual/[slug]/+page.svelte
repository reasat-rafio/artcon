<script lang="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { PageProps } from '@/lib/types/common.types';
  import type { DocumentaryPreviewProps } from '@/lib/types/documentary-preview';
  import { toPlainText } from '@portabletext/svelte';
  import getYouTubeID from 'get-youtube-id';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import Youtube from 'svelte-youtube-embed';
  import { fade } from 'svelte/transition';

  export let data: PageProps<DocumentaryPreviewProps>;

  $: ({
    page: {
      _type,
      name,
      slug,
      sliderImageVideo,
      coverImage,
      information,
      exploreUrl,
      year,
      duration,
      category,
      documentaryVideo,
      synopsys,
      thumbnail,
    },
    site: { logos },
  } = data);

  let onOutroEnd: () => void;
  let transitioningOut = false;
  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let innerWidth = 0;
  $: ytID = getYouTubeID(documentaryVideo.url);

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

<Seo
  seo={{
    _type,
    title: name,
    description: toPlainText(information),
    ogImage: coverImage,
  }}
  siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: exploreUrl, title: 'EXPLORE' },
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
              href: exploreUrl,
              title: 'EXPLORE',
            }} />

          <section
            class="mb-[2.25rem] flex flex-col gap-y-[1.5rem] lg:gap-y-[2rem]">
            <h2 class="head-6 !text-rich-black" data-load-animate="y">
              Our audio visual
            </h2>

            <header
              class="space-y-[0.62rem] text-eerie-black"
              data-load-animate="y">
              <h1
                class="head-4 !inline font-medium !leading-none !text-eerie-black">
                {name}
              </h1>

              <div data-load-animate="y" class="title-light">
                <span>{category.name}</span>
                {#if !!year}
                  <span>
                    <span class="sub-title-light px-1">|</span>
                    {year}
                  </span>
                {/if}
                {#if !!duration}
                  <span>
                    <span class="sub-title-light px-1">|</span>
                    {duration}
                  </span>
                {/if}
              </div>
            </header>
          </section>

          <div
            data-load-animate="y"
            class="relative mb-[2.5rem] max-h-[30.875rem] w-full overflow-hidden rounded-xl sm:aspect-video sm:h-full">
            <Youtube id={ytID} altThumb={true} animations={false}>
              <SanityImage
                sizes="60vw"
                imageUrlBuilder={imageBuilder}
                src={thumbnail}
                alt={thumbnail?.alt} />
            </Youtube>
          </div>

          <div
            data-load-animate="y"
            class="flex h-full flex-col max-2xl:gap-y-[2rem] 2xl:flex-row 2xl:divide-x-[0.03125rem] 2xl:divide-quick-silver">
            <div
              class="title-light w-full space-y-[1.25rem] !leading-[1.4rem] text-dark-gunmetal 2xl:mr-[3rem] 2xl:w-[40%] 3xl:w-[13.875rem]">
              <PortableText value={information} />
            </div>

            <div class="flex-1 space-y-[1.25rem] 2xl:pl-[3rem]">
              <h4 class="body-regular !font-inter !font-normal">
                {synopsys.title}
              </h4>
              <div
                class="description title-light !leading-[143%] text-dark-gunmetal">
                <PortableText value={synopsys.description} />
              </div>
            </div>
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>

<style>
  :global(p > strong) {
    font-weight: 400 !important;
  }
</style>
