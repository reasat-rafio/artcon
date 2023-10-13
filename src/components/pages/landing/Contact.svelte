<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';
  import { twMerge } from 'tailwind-merge';

  export let contact: ContactProps;
  $: ({ socialsWithVisibleLinks, socials, title, subtitle } = contact);
</script>

<section
  class={twMerge(
    'h-screen bg-[#0E0E0F] font-inter text-[#F5EEE6] lg:fixed lg:right-0 lg:top-0 lg:block lg:w-[38vw]',
  )}
>
  <div
    class="relative z-30 flex h-full flex-col px-[1.25rem] pb-[3.75rem] pt-[calc(100vh*.31)] lg:px-[2rem] lg:pb-[4rem]"
  >
    <div class="flex flex-1 flex-col">
      <header
        class="mb-[2.77rem] max-w-xl space-y-[0.81rem] font-medium lg:mb-[3.59rem]"
      >
        <h2
          class="text-[1.25rem] font-medium tracking-[0.025rem] opacity-[0.75]"
        >
          {title}
        </h2>
        <h3 class="text-[1rem] font-medium leading-[1.2rem] tracking-[0.02rem]">
          {subtitle}
        </h3>
      </header>

      <ul class="mb-[1.8rem] flex flex-col gap-y-[1.4rem]">
        {#each socialsWithVisibleLinks as { lightIcon, info }}
          <li class="flex items-start gap-x-[9px]">
            <SanityImage
              class="h-fit w-[0.85938rem]"
              src={lightIcon}
              sizes="15px"
              alt={lightIcon.alt}
              imageUrlBuilder={imageBuilder}
            />
            <div
              class="contact-item-text text-[0.75rem] !leading-[0.95] tracking-[0.015rem]"
            >
              <PortableText value={info} />
            </div>
          </li>
        {/each}
      </ul>
      <ul class="flex gap-x-[1.25rem]">
        {#each socials as { lightIcon, link }}
          <li>
            <a href={link} target="_blank">
              <SanityImage
                class="h-[0.938rem] w-[0.938rem]"
                src={lightIcon}
                sizes="15px"
                alt={lightIcon.alt}
                imageUrlBuilder={imageBuilder}
              />
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="text-[0.75rem] font-light text-[#A5A5A8] max-lg:pb-[3.75rem]">
      © ARTCON 2023
    </div>
  </div>
</section>

<style>
  .contact-item-text > :global(p:empty) {
    padding-bottom: 0.67rem;
  }
</style>
