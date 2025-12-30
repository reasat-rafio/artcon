<script lang="ts">
  import { beforeNavigate } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Vr from '@/components/pages/[preview]/Vr.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { PageProps } from '@/lib/types/common.types';
  import type { VrPreviewProps } from '@/lib/types/vr-preview';
  import { toPlainText } from '@portabletext/svelte';
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';

  export let data: PageProps<VrPreviewProps>;
  $: ({
    page: {
      _type,
      name,
      subtitle,
      description,
      gallery,
      startDate,
      endDate,
      url,
      caption,
      category,
      sliderImageVideo,
      coverImage,
      thumbnail,
      link,
      isActive,
    },
    site: { logos },
  } = data);

  let transitioningOut = false;
  let articleEl: HTMLElement;
  let contentEl: HTMLElement;
  let innerWidth = 0;

  // $: ({ date, status } = calculateStatusBetweenDates({
  //   startDate,
  //   endDate,
  // }));
  $: ({ date } = calculateStatusBetweenDates({
    startDate,
    endDate,
  }));
  $: status = 
    isActive === 'active' 
      ? 'Active' 
      : isActive === 'temporarily-inactive' 
        ? 'Temporarily Inactive' 
        : 'Inactive';

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
</script>

<Seo
  seo={{
    _type,
    title: name,
    description: toPlainText(description ?? ''),
    ogImage: coverImage,
  }}
  siteOgImg={logos?.ogImage} />

<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: url, title: 'Explore', newTab: true },
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
            cta={{ href: url, title: 'Explore', newTab: true }} />
          <Header
            topic="Our virtual reality"
            title={name}
            subtitle={subtitle ?? ''}
            type={category.name}
            {link}
            let:Info>
            <Info>
              <div class="title-light">
                {gallery.name}
              </div>
              <div class="title-light">
                {#if !!date && !!status}
                  <span class="font-light">{date}</span>
                  <span class="px-[6px]">|</span>
                  <span class="font-medium text-eerie-black">{status}</span>
                {/if}
              </div>
            </Info>
          </Header>

          <Vr
            hideCaption
            class="mb-[2.5rem]"
            data-load-animate="y"
            vr={{ _type: 'vr', caption, url, thumbnail }} />
          {#if !!description?.length}
            <div data-load-animate="y">
              <PortableText
                class="body-light-m lg:body-light text-dark-gunmetal"
                value={description} />
            </div>
          {/if}
        </div>
      {/key}
    </section>
  </article>
</section>
