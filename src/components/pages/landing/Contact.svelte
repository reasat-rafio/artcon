<script lang="ts">
  import { getSocialIconPath } from '@/lib/helper';
  import type { ContactProps } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';
  import { twMerge } from 'tailwind-merge';

  export let contact: ContactProps;
  $: ({ socialsWithVisibleLinks, socials, title, subtitle } = contact);

  let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />
<section
  class={twMerge(
    'h-[100dvh] bg-[#0E0E0F] font-inter text-[#F5EEE6] lg:fixed lg:right-0 lg:top-0 lg:block lg:w-[600px] xl:w-[810px]',
  )}>
  <div
    class="relative z-30 flex h-full flex-col px-[1.25rem] pb-[3.75rem] pt-[calc(100dvh*.3125)] lg:px-[2rem] lg:pb-[5.5rem]">
    <div class="flex flex-1 flex-col">
      <header
        class="mb-[2.77rem] max-w-xl space-y-[0.81rem] font-medium lg:mb-[3.45rem]">
        <h2 class="head-6 !leading-[128.5%] opacity-[0.75]">
          {title}
        </h2>
        <h3 class="head-8">
          {subtitle}
        </h3>
      </header>

      <ul class="mb-[1.8rem] flex flex-col gap-y-[1.25rem]">
        {#each socialsWithVisibleLinks as { info, type }}
          <li class="flex items-start gap-x-[0.44rem]">
            <img
              class="h-fit w-[0.85938rem]"
              width="15px"
              height="15px"
              src="/icons/socials/light/{getSocialIconPath(type)}"
              alt="{type}'s icon" />
            <div class="contact-item-text sub-title-light !leading-none">
              <PortableText value={info} />
            </div>
          </li>
        {/each}
      </ul>
      <ul class="flex gap-x-[1.25rem]">
        {#each socials as { type, link }}
          <li>
            <a href={link} target="_blank">
              <img
                class="h-[0.938rem] w-[0.938rem]"
                width="15px"
                height="15px"
                src="/icons/socials/light/{getSocialIconPath(type)}"
                alt="{type}'s icon" />
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div
      class="sub-title-light !leading-none text-[#A5A5A8] max-lg:pb-[3.75rem]">
      © ARTCON 2023
    </div>
  </div>
</section>

<style>
  .contact-item-text > :global(p:empty) {
    padding-bottom: 0.62rem;
  }
</style>
