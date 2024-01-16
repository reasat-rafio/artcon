<script lang="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import FormPopup from '@/components/widgets/form-popup/FormPopup.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { inquirySchema } from '@/lib/validator';
  import formPopupStore from '@/store/form-popup-store';
  import { toPlainText } from '@portabletext/svelte';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { toasts } from 'svelte-toasts';
  import { fade } from 'svelte/transition';
  import { superForm, type FormResult } from 'sveltekit-superforms/client';
  import type { ActionData } from './$types';

  export let data;

  $: ({
    page: {
      _type,
      name,
      sliderImageVideo,
      associationsList,
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
  const f = superForm(data.form, {
    validators: inquirySchema,
    resetForm: true,
    onResult: (event) => {
      const result = event.result as FormResult<ActionData>;

      if (result.type === 'success') {
        formPopupStore.setFormPopupVisibility(false);
        toasts.add({
          description: 'Form submitted successfully',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
      }
    },
  });

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

  function inquiryAction() {
    formPopupStore.setFormPopupVisibility(true);
  }
</script>

<Seo
  seo={{
    _type,
    title: name,
    description: toPlainText(description),
    ogImage: publicationImage,
  }}
  siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { ...exproleLink, newTab: true },
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
          <NavigationMobile cta={{ ...exproleLink, newTab: true }} />

          <div class="flex xl:gap-[1rem] 2xl:gap-[3rem]">
            <section class="w-full lg:max-w-[457px]">
              <Header
                topic="Our publication"
                title={name}
                {subtitle}
                type={category.name}
                let:Info>
                <Info>
                  <div class="sub-title-light">
                    Published By {#each publishedBy as publisher, index}
                      <span class="title-regular">
                        {publisher}{#if index !== publishedBy.length - 1}
                          {#if index === publishedBy.length - 2}
                            {' '}
                            <span class="sub-title-light">and</span>
                          {:else}
                            ,
                          {/if}
                        {/if}
                        {' '}
                      </span>
                    {/each}
                  </div>
                  <div class="sub-title-light">
                    ISBN {isbn}
                  </div>
                </Info>
                <Info>
                  <div class="sub-title-light">
                    Price {#if !!prices?.discountPriceBDT}
                      <span class="!font-normal text-[#9B9B9B] line-through">
                        {prices.priceBDT}
                      </span>
                      <span class="font-medium">
                        <span>{prices.discountPriceBDT} BDT</span>
                        /
                        <span>{prices.priceUSD} USD</span>
                      </span>
                    {:else}
                      <span class="font-medium">
                        <span>{prices.priceBDT} BDT</span>
                        /
                        <span>{prices.priceUSD} USD</span>
                      </span>
                    {/if}
                  </div>

                  <div class="title-light">
                    <span class="sub-title-light">Stock</span>
                    <span class="font-medium capitalize">{stock}</span>
                  </div>
                </Info>
              </Header>

              <div class="mb-[2.5rem] flex w-full justify-center 3xl:hidden">
                <figure data-load-animate="y">
                  <SanityImage
                    class="rounded-[0.9375rem] object-contain"
                    imageUrlBuilder={imageBuilder}
                    src={publicationImage}
                    alt={publicationImage.alt}
                    sizes="100vw" />
                </figure>
              </div>

              <div class="mb-[2.5rem]" data-load-animate="y">
                <PortableText
                  class="body-light-m lg:body-light text-dark-gunmetal"
                  value={description} />
              </div>

              <ul class="mb-[2.5rem] space-y-[0.5rem]" data-load-animate="y">
                {#each associationsList as { key, value }}
                  <li class="sub-title-light">
                    <span>{key}</span>
                    {' '}
                    <span class="!font-normal">{value}</span>
                  </li>
                {/each}
              </ul>
              <div class="pt-[1.38rem]" data-load-animate="y">
                <Cta
                  el="button"
                  className="min-w-[8.6875rem] leading-none capitalize px-[2.56rem] pt-[0.81rem] pb-[0.88rem]"
                  onClick={inquiryAction}
                  variant="tertiary">
                  Buy now
                </Cta>
              </div>
            </section>

            <section class="hidden 3xl:block">
              <figure
                data-load-animate="y"
                class="max-h-[23.75rem] 3xl:mt-[9.44rem]">
                <SanityImage
                  class="rounded-[0.9375rem] object-contain"
                  imageUrlBuilder={imageBuilder}
                  src={publicationImage}
                  alt={publicationImage.alt}
                  sizes="40vw" />
              </figure>
            </section>
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>

{#if $formPopupStore.show}
  <FormPopup
    form={f}
    contextMessage={`The user selected publication is titled ${name} by ${subtitle}.`} />
{/if}
