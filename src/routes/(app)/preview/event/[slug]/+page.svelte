<script lang="ts">
  import { beforeNavigate, goto } from '$app/navigation';
  import Seo from '@/components/common/Seo.svelte';
  import Asset from '@/components/common/hero/Asset.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';
  import { calculateStatusBetweenDates } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { EventPreviewProps } from '@/lib/types/event-preview';
  import { PortableText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import gsap from 'gsap';

  export let data: PageProps<EventPreviewProps>;
  $: ({
    page: {
      name,
      description,
      gallery,
      startDate,
      endDate,
      seo,
      slug,
      sliderImageVideo,
      asset,
      tag,
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

<Seo {seo} siteOgImg={logos?.ogImage} />
<svelte:window bind:innerWidth />
<NavigationDesktop
  ctas={[
    { href: '/', title: 'Back' },
    { href: `/event/${slug.current}`, title: 'EXPLORE' },
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
          <NavigationMobile
            cta={{
              href: `/event/${slug.current}`,
              title: 'EXPLORE',
            }} />

          <Header let:Info topic="Our event" title={name} type={tag.name}>
            <Info>
              <svelte:fragment slot="title-1">
                {gallery.name}
              </svelte:fragment>
              <svelte:fragment slot="title-2">
                <span class="font-light">{date}</span>
                <span class="px-[6px]">|</span>
                <span class="font-medium text-[#ED1C24]">{status}</span>
              </svelte:fragment>
            </Info>
          </Header>

          <div
            data-load-animate="y"
            class="relative mb-[2.5rem] h-[65vh] w-full overflow-hidden rounded-[25px] sm:aspect-video sm:h-full">
            <Asset {asset} />
          </div>

          <div data-load-animate="y" class="body-light-m lg:body-light">
            <PortableText value={description} />
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>