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
  import H8 from '@/components/ui/H8.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import BodyText from '@/components/ui/BodyText.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import Asset from '@/components/hero/Asset.svelte';
  import Navigation from '@/components/pages/preview/Navigation.svelte';

  export let data: PageProps<ExhibitionPreviewProps>;
  $: ({
    page: {
      name,
      description,
      gallery,
      startDate,
      endDate,
      seo,
      previewDisplayImage,
      asset,
      exhibitionType,
    },
    site: { logos },
  } = data);

  let onOutroEnd: () => void;
  let transitioningOut = false;
  let contentEl: HTMLElement;
  let innerWidth = 0;

  $: isSoloExhibition = typeof exhibitionType !== 'string';
  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  onMount(() => {
    if (innerWidth >= 1024) {
      const animationNodes = contentEl.querySelectorAll('[data-load-animate]');
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
      });
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
    }
  });

  beforeNavigate(async (navigation) => {
    if (!transitioningOut) {
      transitioningOut = true;
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      tl.to(contentEl, { opacity: 0 }).to('#previewImage', {
        scale: 1,
        duration: 0.4,
      });
      navigation.cancel();

      onOutroEnd = async () => {
        await goto(navigation.to?.url.pathname as string);
        transitioningOut = false;
      };
    }
  });
</script>

<svelte:window bind:innerWidth />
<Seo {seo} siteOgImg={logos?.ogImage} />
<Navigation />
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
    class="flex h-screen w-full gap-[15px] bg-white max-lg:mt-[1.56rem] max-lg:rounded-t-[0.94rem]"
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
          class="space-y-[2.5rem] px-[4rem] py-[6.063rem] xl:px-[5.438rem] 2xl:px-[8.438rem]"
        >
          <div class="space-y-[32px]">
            <H8 data-load-animate="y">Our exhibition</H8>
            <header class="space-y-[10px]">
              <div data-load-animate="y">
                <H4 class="inline">{name}</H4>
                <H6 class="inline"
                  >/{#if typeof exhibitionType === 'string'}
                    {exhibitionType}
                  {:else}
                    {exhibitionType.en}
                  {/if}</H6
                >
              </div>
              <H8 data-load-animate="y"
                >{#if isSoloExhibition}
                  Solo Exhibition
                {:else}
                  Group Exhibition
                {/if}</H8
              >
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

          <BodyText data-load-animate="y" weight="light">
            <PortableText value={description} />
          </BodyText>
        </div>
      {/key}
    </section>
  </article>
</section>
