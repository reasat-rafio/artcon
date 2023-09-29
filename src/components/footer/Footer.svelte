<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps, FooterProps } from '@/lib/types/common.types';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import BodyText from '../ui/BodyText.svelte';
  import Address from './Address.svelte';

  export let footer: FooterProps;
  export let contact: ContactProps;
  export let logo: SanityAsset;
</script>

<footer>
  <div class="container border-t border-[#BBBBBE] pt-[2.5rem]">
    <section
      class="grid grid-cols-12 border-b border-[#EDEDEE] pb-[1.75rem] lg:pb-[2rem]"
    >
      <div
        class="col-span-12 grid grid-cols-1 max-sm:pb-[1.56rem] sm:col-span-3 lg:col-span-2 xl:grid-cols-2"
      >
        <figure>
          <SanityImage
            class="max-h-[3.125rem] object-contain"
            sizes="90px"
            src={logo}
            imageUrlBuilder={imageBuilder}
            alt="artcon logo"
          />
        </figure>
        <div class="hidden xl:block" />
      </div>

      <div
        class="col-span-12 grid grid-cols-12 max-lg:pb-[2.5rem] sm:col-span-9 lg:col-span-5 lg:pr-2 2xl:col-span-6"
      >
        <div class="col-span-12 flex flex-col justify-between 2xl:col-span-10">
          <BodyText weight="light">{footer.title}</BodyText>

          <div class="hidden space-x-[40px] lg:flex">
            {#each footer.menu as { title, externalUrl, pageUrl }}
              <a
                class="text-title-2 text-[#A5A5A8]"
                href={externalUrl || pageUrl}>{title}</a
              >
            {/each}
          </div>
        </div>
        <div class="hidden 2xl:col-span-2 2xl:block" />
      </div>

      <Address class="col-span-12 grid grid-cols-3 lg:col-span-4" {contact} />

      <div
        class="col-span-12 flex flex-wrap space-x-[40px] pt-[2.62rem] lg:hidden"
      >
        {#each footer.menu as { title, externalUrl, pageUrl }}
          <a class="text-title-2 text-[#A5A5A8]" href={externalUrl || pageUrl}
            >{title}</a
          >
        {/each}
      </div>
    </section>

    <section
      class="flex justify-between text-[14px] text-[#A5A5A8] max-lg:flex-col max-lg:space-y-[0.63rem] max-lg:py-[1.56rem] lg:py-[2.5rem]"
    >
      <p>© ARTCON 2023</p>
      <p>Developed by Edistys</p>
    </section>
  </div>
</footer>
