<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { PublicationPreviewProps } from '@/lib/types/publicationPreview';
  import { toPlainText, PortableText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, goto } from '$app/navigation';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';

  export let data: PageProps<PublicationPreviewProps>;

  $: ({
    page: {
      _type,
      name,
      sliderImageVideo,
      associationsList,
      buyingLink,
      category,
      description,
      exproleLink,
      subtitle,
      publicationImage,
      publishedBy,
      isbn,
      prices,
      stock,
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
    ogImage: publicationImage,
  }}
  siteOgImg={logos?.ogImage}
/>
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[{ href: '/publication', title: 'Back' }, exproleLink]}
/>

<section>
  <MobileImage {sliderImageVideo} />

  <article bind:this={articleEl} class="preview_container">
    <DesktopImage {sliderImageVideo} />

    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={onOutroEnd}
          out:fade={{ duration: 500 }}
          class="preview_content_container"
        >
          <NavigationMobile cta={exproleLink} />

          <div class="grid grid-cols-12 xl:gap-[1rem] 2xl:gap-[3rem]">
            <section class="col-span-12 xl:col-span-7">
              <Header
                topic="Our publication"
                title={name}
                {subtitle}
                type={category.name}
                let:Info
              >
                <Info>
                  <svelte:fragment slot="title-1">
                    Published By {#each publishedBy as publisher, index}
                      <span class="font-medium"
                        >{publisher}{#if index !== publishedBy.length - 1}
                          {#if index === publishedBy.length - 2}
                            {' '} <span class="font-light">and</span>
                          {:else}
                            ,
                          {/if}
                        {/if}
                        {' '}</span
                      >
                    {/each}
                  </svelte:fragment>
                  <svelte:fragment slot="title-2">
                    <div>ISBN {isbn}</div>
                  </svelte:fragment>
                </Info>
                <Info>
                  <svelte:fragment slot="title-1">
                    Price {#if !!prices?.discountPriceBDT}
                      <span class="text-[#9B9B9B] line-through"
                        >{prices.priceBDT}</span
                      >
                      <span class="font-semibold">
                        <span>{prices.discountPriceBDT} BDT</span> /
                        <span>{prices.priceUSD} USD</span>
                      </span>
                    {:else}
                      <span class="font-semibold">
                        <span>{prices.priceBDT} BDT</span> /
                        <span>{prices.priceUSD} USD</span>
                      </span>
                    {/if}
                  </svelte:fragment>
                  <svelte:fragment slot="title-2">
                    Stock <span class="font-medium"
                      >{stock}
                    </span></svelte:fragment
                  >
                </Info>
              </Header>

              <div class="mb-[2.5rem] flex w-full justify-center xl:hidden">
                <figure data-load-animate="y">
                  <SanityImage
                    class="rounded-[0.9375rem] object-contain"
                    imageUrlBuilder={imageBuilder}
                    src={publicationImage}
                    alt={publicationImage.alt}
                    sizes="100vw"
                  />
                </figure>
              </div>

              <div data-load-animate="y" class="body-1 mb-[2.5rem] font-light">
                <PortableText value={description} />
              </div>

              <ul class="mb-[2.5rem] space-y-[0.38rem]" data-load-animate="y">
                {#each associationsList as { key, value }}
                  <li class="preview-b-light">
                    <span>{key}</span>{' '}
                    <span class="font-normal">{value}</span>
                  </li>
                {/each}
              </ul>
              <Cta
                data-load-animate="y"
                class="z-10 mt-[3.88rem]"
                variant="fill"
                color="red-gray"
                href={buyingLink.href}>{buyingLink.title}</Cta
              >
            </section>

            <section class="hidden xl:col-span-5 xl:block">
              <figure data-load-animate="y" class="mt-[20%] max-h-[23.75rem]">
                <SanityImage
                  class="rounded-[0.9375rem] object-contain"
                  imageUrlBuilder={imageBuilder}
                  src={publicationImage}
                  alt={publicationImage.alt}
                  sizes="40vw"
                />
              </figure>
            </section>
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>
