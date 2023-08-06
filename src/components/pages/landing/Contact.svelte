<script lang="ts">
  import H2 from '@/components/ui/H2.svelte';
  import H5 from '@/components/ui/H5.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps } from '@/lib/types/common.types';
  import { fade } from 'svelte/transition';
  import { PortableText } from '@portabletext/svelte';

  export let contact: ContactProps;
  let { socialsWithVisibleLinks, socials } = contact;

  let state: 'hidden' | 'visible' = 'visible';
  $: isVisible = state === 'visible';
</script>

{#if isVisible}
  <section
    transition:fade
    class="fixed right-0 top-0 h-screen w-[50vw] bg-[#0E0E0F] text-white text-opacity-70"
  >
    <div class="relative z-30 flex h-full flex-col px-[27px] py-[85px]">
      <div class="flex flex-1 flex-col justify-center">
        <header class="mb-[57px]">
          <H2>title</H2>
          <H5>subtitle</H5>
        </header>

        <ul class="mb-[48px] flex flex-col space-y-[23px]">
          {#each socialsWithVisibleLinks as { icon, info }}
            <li class="flex space-x-[9px]">
              <SanityImage
                class="mt-[5px] h-[15px] w-[15px]"
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
