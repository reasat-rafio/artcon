<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Vr from '@/components/VR.svelte';
  import BodyText from '@/components/ui/BodyText.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import H8 from '@/components/ui/H8.svelte';
  import { calculateStatusBetweenDates, delay } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { PageProps } from '@/lib/types/common.types';
  import type { VrPreviewProps } from '@/lib/types/vrPreview';
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, goto } from '$app/navigation';

  export let data: PageProps<VrPreviewProps>;
  $: ({
    page: {
      _type,
      name,
      description,
      previewImage,
      placeholderImage,
      gallery,
      startDate,
      endDate,
      url,
    },
    site: { logos },
  } = data);

  let onOutroEnd: () => void;
  let transitioningOut = false;
  let contentEl: HTMLElement;

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  onMount(() => {
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

<Seo
  seo={{
    _type,
    title: name,
    description: toPlainText(description),
    ogImage: previewImage,
  }}
  siteOgImg={logos?.ogImage}
/>

<section>
  <article class="flex h-screen w-full gap-[15px]">
    <div class="flex-[35%]">
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
    <section bind:this={contentEl} class="flex-[65%] overflow-scroll">
      {#key transitioningOut}
        <div
          on:outroend={onOutroEnd}
          out:fade={{ duration: 500 }}
          class="space-y-[40px] px-[135px] py-[97px]"
        >
          <div class="space-y-[32px]">
            <H8 data-load-animate="y">Our virtual reality</H8>
            <header class="space-y-[10px]">
              <div data-load-animate="y">
                <H4 class="inline">{name}</H4>
                <H6 class="inline">/ Showrov Chowdury</H6>
              </div>
              <H8 data-load-animate="y">Exhibition</H8>
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
          <Vr
            data-load-animate="y"
            vr={{ previewImage: placeholderImage, url }}
          />
          <BodyText data-load-animate="y" weight="light">
            <PortableText value={description} />
          </BodyText>
        </div>
      {/key}
    </section>
  </article>
</section>
