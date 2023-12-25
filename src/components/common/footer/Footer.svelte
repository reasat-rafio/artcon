<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps, FooterProps } from '@/lib/types/common.types';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import Address from './Address.svelte';

  export let footer: FooterProps;
  export let contact: ContactProps;
  export let logo: SanityAsset;
</script>

<footer>
  <div class="container-primary">
    <div
      class="flex flex-col border-t border-quick-silver/80 pb-[2rem] pt-[2.6875rem] max-lg:flex-wrap lg:flex-row">
      <figure class="max-lg:pb-[1.56rem] lg:pr-[5%] 2xl:pr-[6.125rem]">
        <SanityImage
          class="w-full object-contain max-lg:max-h-[3.125rem] max-lg:max-w-[5.30819rem] "
          sizes="90px"
          src={logo}
          imageUrlBuilder={imageBuilder}
          alt="Artcon logo" />
      </figure>

      <div
        class="flex flex-col justify-between max-lg:pb-[2.5rem] lg:w-[50%] lg:pr-[5%] 3xl:w-[59.8%] 3xl:pr-[9.0625rem]">
        <p class="body-light">{footer.title}</p>

        <div class="hidden space-x-[2.5rem] lg:flex">
          {#each footer.menu as { title, externalUrl, pageUrl }}
            <a
              class="title-regular text-quick-silver"
              href={externalUrl || pageUrl}>
              {title}
            </a>
          {/each}
        </div>
      </div>

      <div class="max-lg:pb-[2.56rem]">
        <Address {contact} />
      </div>

      <div class=" flex space-x-[2.5rem] lg:hidden">
        {#each footer.menu as { title, externalUrl, pageUrl }}
          <a
            class="title-regular text-quick-silver"
            href={externalUrl || pageUrl}>
            {title}
          </a>
        {/each}
      </div>
    </div>
    <div
      class="flex flex-col justify-between border-t border-light-gray/50 pb-[1.5rem] pt-[1.56rem] max-lg:space-y-[0.63rem] lg:flex-row lg:items-center lg:pb-[2.5rem] lg:pt-[2rem]">
      <p class="title-regular text-quick-silver">© ARTCON 2023</p>
      <p class="title-light text-quick-silver">Developed by Edistys</p>
    </div>
  </div>
</footer>
