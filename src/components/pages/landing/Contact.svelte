<script lang="ts">
  import { getSocialIconPath } from '@/lib/helper';
  import type { ContactProps } from '@/lib/types/common.types';
  import { twMerge } from 'tailwind-merge';
  import { PortableText } from '@portabletext/svelte';

  export let contact: ContactProps;
  $: ({ socialsWithVisibleLinks, socials, title, subtitle } = contact);

  let windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />
<section
  class={twMerge(
    'h-[100dvh] bg-[#0E0E0F] font-inter text-alabaster lg:fixed lg:right-0 lg:top-0 lg:block lg:w-[600px] xl:w-[785px]',
  )}>
  <div
    class="relative z-30 flex h-full flex-col px-[1.25rem] pb-[3.75rem] pt-[calc(100dvh*.3125)] lg:px-[40px] lg:pb-[5.5rem]">
    <div class="flex flex-1 flex-col">
      <header
        class="mb-[2.77rem] max-w-xl space-y-[0.81rem] font-medium lg:mb-[3.45rem]">
        <h2 class="head-6 !leading-[128.5%] text-alabaster/75 opacity-[0.75]">
          {title}
        </h2>
        <h3
          class="head-8 !text-[16px] !font-medium !normal-case !tracking-[0.05rem] text-alabaster">
          {subtitle}
        </h3>
      </header>

      <ul class="mb-[1.8rem] flex flex-col gap-y-[1.25rem]">
        {#each socialsWithVisibleLinks as { info, type }}
          <li class="flex items-start gap-x-[0.44rem]">
            <img
              class="w-[0.85938rem] object-contain"
              width="15px"
              height="15px"
              src="/icons/socials/light/{getSocialIconPath(type)}"
              alt="{type}'s icon" />
            <div
              class="contact-item-text sub-title-light !leading-none !text-alabaster">
              <PortableText components={{}} value={info} />
            </div>
          </li>
        {/each}
      </ul>
      <ul class="flex gap-x-[1.25rem] lg:translate-x-[19px]">
        {#each socials as { type, link }}
          <li>
            <a href={link} target="_blank">
              <img
                class="h-[1.2rem] object-contain"
                width="20px"
                height="20px"
                src="/icons/socials/light/{getSocialIconPath(type)}"
                alt="{type}'s icon" />
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div
      class="sub-title-light !leading-none text-quick-silver max-lg:pb-[3.75rem]">
      © ARTCON 2023
    </div>
  </div>
</section>

<style>
  .contact-item-text > :global(p:empty) {
    padding-bottom: 10px;
  }
</style>
