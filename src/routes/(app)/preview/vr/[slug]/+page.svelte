<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Vr from '@/components/VR.svelte';
  import BodyText from '@/components/ui/BodyText.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import H6 from '@/components/ui/H6.svelte';
  import H8 from '@/components/ui/H8.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { PageProps } from '@/lib/types/common.types';
  import type { VrPreviewProps } from '@/lib/types/vrPreview';
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

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

  $: ({ date, status } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));

  onMount(() => {
    gsap.from('[data-load-animate]', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      delay: 0.5,
    });
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
      <figure class="h-full w-full">
        <SanityImage
          lqip
          class="h-full w-full object-cover"
          sizes="50vw"
          imageUrlBuilder={imageBuilder}
          src={previewImage}
          alt={previewImage.alt}
        />
      </figure>
    </div>
    <section class="flex-[65%] overflow-scroll">
      <div class="space-y-[40px] px-[135px] py-[97px]">
        <div class="space-y-[32px]">
          <H8 data-load-animate="y" class="">Our virtual reality</H8>
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
    </section>
  </article>
</section>
