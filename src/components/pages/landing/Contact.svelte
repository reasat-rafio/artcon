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
    'h-screen bg-[#0E0E0F] text-[#F5EEE6] text-opacity-70 lg:fixed lg:right-0 lg:top-0 lg:block lg:w-[50vw]',
  )}
>
  <div
    class="relative z-30 flex h-full flex-col max-lg:container lg:px-[1.688rem] lg:py-[5.313rem]"
  >
    <div class="flex flex-1 flex-col justify-center">
      <header
        class="mb-[2.77rem] max-w-xl space-y-[0.81rem] font-medium lg:mb-[3.563rem]"
      >
        <h2 class="text-[1.25rem] tracking-[0.025rem]">{title}</h2>
        <h3 class="text-[1rem] leading-[1.2rem] tracking-[0.02rem]">
          {subtitle}
        </h3>
      </header>

      <ul class="mb-[1.86rem] flex flex-col space-y-[1.52rem] lg:mb-[3rem]">
        {#each socialsWithVisibleLinks as { lightIcon, info }}
          <li class="flex items-start space-x-[9px]">
            <SanityImage
              class="mt-[0.375rem] h-[0.938rem] w-[0.938rem]"
              src={lightIcon}
              sizes="15px"
              alt={lightIcon.alt}
              imageUrlBuilder={imageBuilder}
            />
            <div>
              <PortableText value={info} />
            </div>
          </li>
        {/each}
      </ul>
      <ul class="flex space-x-[1.25rem]">
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
    <div class="max-lg:pb-[3.75rem]">© ARTCON 2023</div>
  </div>
</section>
