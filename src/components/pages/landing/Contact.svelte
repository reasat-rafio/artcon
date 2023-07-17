<script lang="ts">
  import H2 from '@/components/ui/H2.svelte';
  import H5 from '@/components/ui/H5.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps } from '@/lib/types/common.types';
  import { fade } from 'svelte/transition';
  import { PortableText } from '@portabletext/svelte';

  export let contact: ContactProps;
  let { title, subtitle, socialsWithVisibleLinks, socials } = contact;

  let state: 'hidden' | 'visible' = 'visible';
  $: isVisible = state === 'visible';
</script>

{#if isVisible}
  <section
    transition:fade
    class="fixed right-0 top-0 w-[50vw] h-screen bg-[#0E0E0F] text-white text-opacity-70"
  >
    <div class="relative z-30 px-[27px] py-[85px] flex flex-col h-full">
      <div class="flex flex-col justify-center flex-1">
        <header class="mb-[57px]">
          <H2>{title}</H2>
          <H5>{subtitle}</H5>
        </header>

        <ul class="flex flex-col space-y-[23px] mb-[48px]">
          {#each socialsWithVisibleLinks as { icon, info }}
            <li class="flex space-x-[9px]">
              <SanityImage
                class="h-[15px] w-[15px] mt-[5px]"
                src={icon}
                sizes="15px"
                alt={''}
                imageUrlBuilder={imageBuilder}
              />
              <div>
                <PortableText value={info} />
              </div>
            </li>
          {/each}
        </ul>
        <ul class="flex space-x-[20px]">
          {#each socials as { icon, link }}
            <li>
              <a href={link} target="_blank">
                <SanityImage
                  class="h-[15px] w-[15px]"
                  src={icon}
                  sizes="15px"
                  alt={link}
                  imageUrlBuilder={imageBuilder}
                />
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <div>
        © ARTCON 2023
        <!-- <a href="" /> -->
      </div>
    </div>
  </section>
{/if}
