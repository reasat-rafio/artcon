<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import Asset from '@/components/common/hero/Asset.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { PageProps } from '@/lib/types/common.types';
  import type { ExhibitionPreviewProps } from '@/lib/types/exhibition-preview';
  import lightboxStore from '@/store/lightbox';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  export let data: PageProps<ExhibitionPreviewProps>;
  $: ({
    page: {
      name,
      description,
      gallery,
      startDate,
      endDate,
      seo,
      topTitle,
      subtitle,
      slug,
      sliderImageVideo,
      asset,
      exhibitionType,
      invitationCard,
    },
    site: { logos },
  } = data);

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

  function openInvitationCardPopup() {
    if (invitationCard?.fullInvitationCardImage) {
      lightboxStore.setLightboxVisibility(true);
      lightboxStore.setActiveIndex(0);
      lightboxStore.setHideThumbnails(true);
      lightboxStore.setAllImages([
        {
          ...invitationCard.fullInvitationCardImage,
          caption: name,
        },
      ]);
    }
  }
</script>

<Seo {seo} siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: `/exhibition/${slug.current}`, title: 'Exhibition' },
  ]} />
<section>
  <MobileImage {sliderImageVideo} />

  <article bind:this={articleEl} class="preview_container">
    <DesktopImage {sliderImageVideo} />

    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={() => (transitioningOut = false)}
          class="preview_content_container">
          <NavigationMobile
            cta={{
              href: `/exhibition/${slug.current}`,
              title: 'Exhibition',
            }} />

          <div class="flex xl:gap-[1rem] 2xl:gap-[3rem]">
            <section class="w-full" style="transform: scale(calc(100vw / 1440)); transform-origin: top left;">
              <Header
                let:Info
                topic="Our Exhibition"
                title={name}
                subtitle={!!subtitle
                  ? subtitle
                  : typeof exhibitionType === 'string'
                    ? exhibitionType
                    : exhibitionType.en}
                type={!!topTitle
                  ? topTitle
                  : isSoloExhibition
                    ? 'Solo Exhibition'
                    : 'Group Exhibition'}>
                <Info>
                  {@const galleryUrl = gallery.url || (gallery.location?.startsWith('http') ? gallery.location : null)}
                  <div class="title-light !font-inter">
                    {#if galleryUrl}
                      <a href={galleryUrl} target="_blank" rel="noopener noreferrer" class="cursor-pointer transition-colors hover:!text-gray-500">
                        {gallery.name}<span>, </span>
                      </a>
                    {:else}
                      {gallery.name}
                    {/if}
                    {#if gallery.location && !gallery.location.startsWith('http')}
                      {gallery.location}
                    {/if}
                  </div>
                  <div class="sub-title-light !font-inter">
                    <span class="font-light">{date}</span>
                    <span class="px-[3px] text-eerie-black/50">|</span>
                    <span class="font-medium text-eerie-black">{status}</span>
                  </div>
                </Info>
              </Header>

              <div class="mb-[2.5rem] flex w-full justify-center 3xl:hidden">
                <button data-load-animate="y" class="cursor-pointer" on:click={status === 'Upcoming' && invitationCard?.invitationCardImage ? openInvitationCardPopup : undefined}>
                  {#if status === 'Upcoming' && invitationCard?.invitationCardImage}
                    <SanityImage
                      class="rounded-[0.9375rem] object-contain w-full h-auto"
                      imageUrlBuilder={imageBuilder}
                      src={invitationCard.invitationCardImage}
                      alt={invitationCard.invitationCardImage.alt || 'Exhibition Invitation Card'}
                      sizes="100vw" />
                  {:else if data.page.publication?.publicationImage}
                    <SanityImage
                      class="rounded-[0.9375rem] object-contain w-full h-auto"
                      imageUrlBuilder={imageBuilder}
                      src={data.page.publication.publicationImage}
                      alt={data.page.publication.publicationImage.alt}
                      sizes="100vw" />
                  {/if}
                </button>
              </div>

              {#if !!description?.length}
                <div class="mb-[2.5rem]" data-load-animate="y">
                  <PortableText
                    class="body-light-m lg:body-light text-dark-gunmetal"
                    value={description} />
                </div>
              {/if}
            </section>

            <section class="hidden 3xl:block w-full" style="transform: scale(calc(100vw / 1440)); transform-origin: top left;">
              <button
                data-load-animate="y"
                class="3xl:mt-[9.44rem] cursor-pointer block w-full"
                on:click={status === 'Upcoming' && invitationCard?.invitationCardImage ? openInvitationCardPopup : undefined}>
                {#if status === 'Upcoming' && invitationCard?.invitationCardImage}
                  <SanityImage
                    class="rounded-[0.9375rem] object-contain w-full h-auto"
                    imageUrlBuilder={imageBuilder}
                    src={invitationCard.invitationCardImage}
                    alt={invitationCard.invitationCardImage.alt || 'Exhibition Invitation Card'}
                    sizes="40vw" />
                {:else if data.page.publication?.publicationImage}
                  <SanityImage
                    class="rounded-[0.9375rem] object-contain w-full h-auto"
                    imageUrlBuilder={imageBuilder}
                    src={data.page.publication.publicationImage}
                    alt={data.page.publication.publicationImage.alt}
                    sizes="40vw" />
                {/if}
              </button>
            </section>
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>
