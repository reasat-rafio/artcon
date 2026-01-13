<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import Quote from '@/components/common/Quote.svelte';
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
  import formPopupStore from '@/store/form-popup';
  import lightboxStore from '@/store/lightbox';
  import { toPlainText } from '@portabletext/svelte';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { toasts } from 'svelte-toasts';
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
      artworkImages,
      publishedBy,
      quote,
      artist,
    },
    site: { logos },
  } = data);

  $: collectionImage = artworkImages?.[0];

  let transitioningOut = false;
  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let innerWidth = 0;
  const f = superForm(data.form, {
    validators: inquirySchema,
    resetForm: true,
    onResult: ({ result }) => {
      console.log('Form result:', result);
      
      if (result.type === 'success') {
        formPopupStore.setFormPopupVisibility(false);
        toasts.add({
          description: 'Form submitted successfully',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
      } else if (result.type === 'failure') {
        const errorMsg = result.data?.error || 'Failed to submit form';
        toasts.add({
          description: errorMsg,
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'error',
        });
        console.error('Form submission error:', errorMsg);
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
        tl.to('#previewImage', { scale: 1.08, duration: 1 }).from(
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

  function inquiryAction() {
    formPopupStore.setFormPopupVisibility(true);
  }

  function openImagePopup() {
    lightboxStore.setLightboxVisibility(true);
    lightboxStore.setActiveIndex(0);
    lightboxStore.setHideThumbnails(artworkImages?.length <= 1);
    lightboxStore.setAllImages(
      artworkImages?.map((img: any) => ({
        ...img,
        caption: name,
      })) || []
    );
  }
</script>

<Seo
  seo={{
    _type,
    title: name,
    description: toPlainText(description ?? ''),
    ogImage: collectionImage,
  }}
  siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: exproleLink?.href || '#', title: exproleLink?.title || 'Explore', newTab: true },
  ]} />

<section>
  <MobileImage {sliderImageVideo} />

  <article bind:this={articleEl} class="preview_container">
    <DesktopImage {sliderImageVideo} />

    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          class="preview_content_container"
          on:outroend={() => (transitioningOut = false)}>
          <NavigationMobile cta={{ href: exproleLink?.href || '#', title: exproleLink?.title || 'Explore', newTab: true }} />

          <div class="flex xl:gap-[1rem] 2xl:gap-[3rem]">
            <section class="w-full lg:max-w-[457px]">
              <Header
                topic="Our Collection"
                title={name}
                subtitle={subtitle ? subtitle : ''}
                type={category.title}
                let:Info>
                {#if !!associationsList?.length}
                  <Info>
                    <ul class="mb-[2.5rem] space-y-[0.5rem]">
                      {#each associationsList as { key, value }}
                        <li class="sub-title-light">
                          <span>{key}</span>
                          {' '}
                          <span class="!font-normal">{value}</span>
                        </li>
                      {/each}
                    </ul>
                  </Info>
                {/if}
                <Info>
                  <div class="sub-title-light">
                    Published by {#each publishedBy as publisher, index}
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
                </Info>
              </Header>

              <div class="mb-[2.5rem] flex w-full justify-center 3xl:hidden">
                <button data-load-animate="y" class="cursor-pointer" on:click={openImagePopup}>
                  <SanityImage
                    class="rounded-[0.9375rem] object-contain"
                    imageUrlBuilder={imageBuilder}
                    src={collectionImage}
                    alt={collectionImage.alt}
                    sizes="100vw" />
                </button>
              </div>

              {#if !!description?.length}
                <div class="mb-[2.5rem]" data-load-animate="y">
                  <PortableText
                    class="body-light-m lg:body-light text-dark-gunmetal"
                    value={description} />
                </div>
              {/if}

              <div class="pt-[1.38rem]" data-load-animate="y">
                <Cta
                  el="button"
                  className="min-w-[8.6875rem] leading-none capitalize px-[2.56rem] pt-[0.81rem] pb-[0.88rem]"
                  onClick={inquiryAction}
                  variant="tertiary">
                  Inquiry
                </Cta>
              </div>
            </section>

            <section class="hidden 3xl:block">
              <button
                data-load-animate="y"
                class="3xl:mt-[9.44rem] cursor-pointer block w-full"
                on:click={openImagePopup}>
                <SanityImage
                  class="rounded-[0.9375rem] object-contain w-full h-auto"
                  imageUrlBuilder={imageBuilder}
                  src={collectionImage}
                  alt={collectionImage.alt}
                  sizes="40vw" />
              </button>
              {#if !!quote}
                <div class="mt-[2.5rem] [&_div]:!head-4" data-load-animate="y">
                  <Quote {quote} class="!translate-y-0" />
                </div>
              {/if}
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
    contextMessage={`The user selected collection is titled ${name}${artist?.name ? ` by ${artist.name}` : subtitle ? ` by ${subtitle}` : ''}.`} />
{/if}
