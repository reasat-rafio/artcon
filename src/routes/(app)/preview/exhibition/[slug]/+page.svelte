<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionPreviewProps } from '@/lib/types/exhibitionPreview';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { beforeNavigate, goto } from '$app/navigation';
  import { fade } from 'svelte/transition';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import Asset from '@/components/hero/Asset.svelte';
  import NavigationDesktop from '@/components/pages/preview/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/preview/NavigationMobile.svelte';

  export let data: PageProps<ExhibitionPreviewProps>;
  $: ({
    page: {
      name,
      description,
      gallery,
      startDate,
      endDate,
      seo,
      slug,
      previewDisplayImage,
      asset,
      exhibitionType,
    },
    site: { logos },
  } = data);

  let onOutroEnd: () => void;
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

<Seo {seo} siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: `/exhibition/${slug.current}`, title: 'Exhibition' },
  ]}
/>
<section>
  <div class="fixed inset-0 -z-10 block lg:hidden">
    <figure class="h-full w-full overflow-hidden">
      <SanityImage
        id="previewImage"
        class="h-full w-full object-cover"
        sizes="50vw"
        imageUrlBuilder={imageBuilder}
        src={previewDisplayImage}
        alt={previewDisplayImage.alt}
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
          src={previewDisplayImage}
          alt={previewDisplayImage.alt}
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
          <NavigationMobile
            cta={{ href: `/exhibition/${slug.current}`, title: 'Exhibition' }}
          />
          <div class="space-y-[1.5rem] lg:space-y-[2rem]">
            <h2 class="preview-h-2" data-load-animate="y">Our exhibition</h2>
            <header class="space-y-[0.625rem]">
              <div data-load-animate="y">
                <h1 class="preview-h-1 inline">
                  {name}
                </h1>
                <h3 class="preview-h-3 inline">
                  /{#if typeof exhibitionType === 'string'}
                    {exhibitionType}
                  {:else}
                    {exhibitionType.en}
                  {/if}
                </h3>
              </div>
              <h4 class="preview-h-4" data-load-animate="y">
                {#if isSoloExhibition}
                  Solo Exhibition
                {:else}
                  Group Exhibition
                {/if}
              </h4>
            </header>
            <div data-load-animate="y" class="space-y-[6px] text-[#1B1B1E]">
              <div class="text-title-2 font-light">
                {gallery.name}
              </div>
              <div class="text-subtitle-2">
                <span class="font-light">{date}</span> |
                <span class="font-medium text-[#ED1C24]">{status}</span>
              </div>
            </div>
          </div>
          <div
            data-load-animate="y"
            class="relative aspect-video max-h-[494px] w-full overflow-hidden rounded-[25px]"
          >
            <Asset {asset} />
          </div>

          <div data-load-animate="y" class="body-1 font-light">
            <PortableText value={description} />
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>
