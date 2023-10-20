<script lang="ts">
  import Seo from '@/components/Seo.svelte';
  import Vr from '@/components/VR.svelte';
  import { calculateStatusBetweenDates, delay } from '@/lib/helper';
  import type { PageProps } from '@/lib/types/common.types';
  import type { VrPreviewProps } from '@/lib/types/vrPreview';
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import { beforeNavigate, goto } from '$app/navigation';
  import NavigationDesktop from '@/components/pages/[preview]/NavigationDesktop.svelte';
  import NavigationMobile from '@/components/pages/[preview]/NavigationMobile.svelte';
  import Header from '@/components/pages/[preview]/header/Header.svelte';
  import DesktopImage from '@/components/pages/[preview]/DesktopImage.svelte';
  import MobileImage from '@/components/pages/[preview]/MobileImage.svelte';

  export let data: PageProps<VrPreviewProps>;
  $: ({
    page: {
      _type,
      name,
      subtitle,
      description,
      previewImage,
      placeholderImage,
      gallery,
      startDate,
      endDate,
      url,
      category,
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
  <MobileImage image={previewImage} />

  <article bind:this={articleEl} class="preview_container">
    <DesktopImage image={previewImage} />
    <section bind:this={contentEl} class="preview_content_wrapper">
      {#key transitioningOut}
        <div
          on:outroend={onOutroEnd}
          out:fade={{ duration: 500 }}
          class="preview_content_container"
        >
          <NavigationMobile
            cta={{ href: url, title: 'Explore', newTab: true }}
          />
          <Header
            title={name}
            {subtitle}
            topic={category.name}
            type="Exhibition"
            let:Info
          >
            <Info>
              <svelte:fragment slot="title-1">
                {gallery.name}
              </svelte:fragment>
              <svelte:fragment slot="title-2">
                <span class="font-light">{date}</span> |
                <span class="font-medium text-[#ED1C24]">{status}</span>
              </svelte:fragment>
            </Info>
          </Header>

          <Vr
            class="mb-[2.5rem]"
            data-load-animate="y"
            vr={{ previewImage: placeholderImage, url }}
          />
          <div data-load-animate="y" class="body-1 font-light">
            <PortableText value={description} />
          </div>
        </div>
      {/key}
    </section>
  </article>
</section>
