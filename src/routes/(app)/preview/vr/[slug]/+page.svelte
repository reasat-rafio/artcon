<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Vr from '@/components/VR.svelte';
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
  import NavigationDesktop from '@/components/pages/preview/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/preview/NavigationMobile.svelte';

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

<Seo
  seo={{
    _type,
    title: name,
    description: toPlainText(description),
    ogImage: previewImage,
  }}
  siteOgImg={logos?.ogImage}
/>

<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: url, title: 'Explore', newTab: true },
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
          <NavigationMobile
            cta={{ href: url, title: 'Explore', newTab: true }}
          />
          <div class="space-y-[1.5rem] lg:space-y-[2rem]">
            <h2 class="preview-h-2" data-load-animate="y">
              Our virtual reality
            </h2>
            <header class="space-y-[10px]">
              <div data-load-animate="y">
                <h1 class="preview-h-1 inline">{name}</h1>
                <h3 class="preview-h-3 inline">/ Showrov Chowdury</h3>
              </div>
              <h4 class="preview-h-4" data-load-animate="y">Exhibition</h4>
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
          <div>
            <Vr
              data-load-animate="y"
              vr={{ previewImage: placeholderImage, url }}
            />
            <div data-load-animate="y" class="body-1 font-light">
              <PortableText value={description} />
            </div>
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>
