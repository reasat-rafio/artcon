<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { PublicationPreviewProps } from '@/lib/types/publicationPreview';
  import { toPlainText, PortableText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, goto } from '$app/navigation';
  import NavigationDesktop from '@/components/pages/preview/NavigationDesktop.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import NavigationMobile from '@/components/pages/preview/NavigationMobile.svelte';
  import Cta from '@/components/ui/Cta.svelte';

  export let data: PageProps<PublicationPreviewProps>;

  $: ({
    page: {
      _type,
      name,
      previewImage,
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
    ogImage: previewImage,
  }}
  siteOgImg={logos?.ogImage}
/>
<svelte:window bind:innerWidth />
<NavigationDesktop ctas={[{ href: '/', title: 'Back' }, exproleLink]} />

<section>
  <div class="fixed inset-0 -z-10 block lg:hidden">
    <figure class="h-full w-full overflow-hidden">
      <SanityImage
        id="previewImage"
        class="h-full w-full object-cover"
        sizes="100vw"
        imageUrlBuilder={imageBuilder}
        src={previewImage}
        alt={previewImage.alt}
      />
    </figure>
  </div>
  <article bind:this={articleEl} class="preview_container">
    <div class="preview_img_wrapper_desktop">
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
    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={onOutroEnd}
          out:fade={{ duration: 500 }}
          class="preview_content_container"
        >
          <NavigationMobile cta={exproleLink} />

          <div class="grid grid-cols-12 xl:gap-[1rem] 2xl:gap-[3rem]">
            <div class="col-span-12 xl:col-span-7">
              <div class="space-y-[1.5rem] lg:space-y-[2rem]">
                <h2 class="preview-h-2" data-load-animate="y">
                  Our publication
                </h2>
                <header class="space-y-[0.62rem]">
                  <div data-load-animate="y">
                    <h1 class="preview-h-1 inline">{name}</h1>
                    <h3 class="preview-h-3 inline">/ {subtitle}</h3>
                  </div>
                  <h4 class="preview-h-4" data-load-animate="y">
                    {category.name}
                  </h4>
                </header>
                <div data-load-animate="y" class="space-y-[6px] text-[#1B1B1E]">
                  <div class="preview-b-light space-y-[1.5rem] font-inter">
                    <div>
                      <h5 class="font-inter font-light">
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
                      </h5>
                      <div>ISBN {isbn}</div>
                    </div>
                    <div>
                      <div>
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
                      </div>
                      <div>Stock <span class="font-medium">{stock}</span></div>
                    </div>
                  </div>
                </div>

                <div class="flex w-full justify-center xl:hidden">
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

                <div data-load-animate="y" class="body-1 font-light">
                  <PortableText value={description} />
                </div>

                <ul class="space-y-[0.38rem]" data-load-animate="y">
                  {#each associationsList as { key, value }}
                    <li class="preview-b-light">
                      <span>{key}</span>{' '}
                      <span class="font-normal">{value}</span>
                    </li>
                  {/each}
                </ul>
              </div>
              <Cta
                data-load-animate="y"
                class="z-10 mt-[3.88rem]"
                variant="fill"
                color="red-gray"
                href={buyingLink.href}>{buyingLink.title}</Cta
              >
            </div>

            <div class="hidden xl:col-span-5 xl:block">
              <figure data-load-animate="y" class="mt-[20%] max-h-[23.75rem]">
                <SanityImage
                  class="rounded-[0.9375rem] object-contain"
                  imageUrlBuilder={imageBuilder}
                  src={publicationImage}
                  alt={publicationImage.alt}
                  sizes="40vw"
                />
              </figure>
            </div>
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>
