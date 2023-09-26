<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps } from '@/lib/types/common.types';
  import { PortableText } from '@portabletext/svelte';

  export let contact: ContactProps;
  $: ({ socialsWithVisibleLinks, socials, title, subtitle } = contact);
</script>

<section
  class="fixed right-0 top-0 h-screen w-[50vw] bg-[#0E0E0F] text-[#F5EEE6] text-opacity-70"
>
  <div class="relative z-30 flex h-full flex-col px-[27px] py-[85px]">
    <div class="flex flex-1 flex-col justify-center">
      <header class="mb-[57px] max-w-xl space-y-[0.81rem] font-medium">
        <h2 class="text-[1.25rem] tracking-[0.025rem]">{title}</h2>
        <h3 class="text-[1rem] leading-[1.2rem] tracking-[0.02rem]">
          {subtitle}
        </h3>
      </header>

      <ul class="mb-[48px] flex flex-col space-y-[1.52rem]">
        {#each socialsWithVisibleLinks as { lightIcon, info }}
          <li class="flex items-start space-x-[9px]">
            <SanityImage
              class="mt-[6px] h-[15px] w-[15px]"
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
                class="h-[15px] w-[15px]"
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
    <div>© ARTCON 2023</div>
  </div>
</section>
