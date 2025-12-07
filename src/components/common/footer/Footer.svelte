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

<footer id="footer" class="mt-auto">
  <div class="container-primary">
    <div
      class="flex flex-col border-t border-quick-silver/50 pb-[2rem] pt-[2rem] max-lg:flex-wrap lg:flex-row">
      <a
        href="/"
        class="max-lg:pb-[1.56rem] lg:pr-[5%] 2xl:pr-[6.125rem] 3xl:translate-y-[10px]">
        <SanityImage
          class="w-full object-contain max-lg:max-h-[3.125rem] max-lg:max-w-[5.30819rem] lg:h-[3.125rem]"
          sizes="90px"
          src={logo}
          imageUrlBuilder={imageBuilder}
          alt="Artcon logo" />
      </a>

      <div
        class="flex flex-col justify-between max-lg:pb-[2.5rem] lg:w-[50%] lg:pr-[5%] 3xl:w-[56%] 3xl:translate-y-[10px] 3xl:pr-[9.0625rem]">
        <p class="font-inter text-[0.875rem] font-light leading-[170%]">
          {footer.title}
        </p>

        <div class="hidden space-x-[2.5rem] lg:flex 3xl:translate-y-[-10px]">
          {#each footer.menu as { title, externalUrl, pageUrl }}
            <a
              class="font-inter text-[12px] font-normal leading-[120%] text-quick-silver transition-all duration-300 hover:text-dark-gunmetal"
              href={externalUrl || pageUrl}>
              {title}
            </a>
          {/each}
        </div>
      </div>

      <div
        class="max-lg:pb-[2.56rem] 3xl:translate-x-[10px] 3xl:translate-y-[10px]">
        <Address {contact} />
      </div>

      <div class="flex gap-x-[2.5rem] lg:hidden">
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
      class="flex flex-col justify-between border-t border-quick-silver/50 pb-[1.5rem] pt-[1.56rem] max-lg:space-y-[0.63rem] lg:flex-row lg:items-center lg:pb-[2.5rem] lg:pt-[2rem]">
      <p class="title-regular text-quick-silver">© ARTCON 2023</p>
      <p
        class="font-inter text-[14px] font-normal leading-[120%] text-quick-silver">
        Developed by <a
          class="font-medium hover:underline"
          href="https://edistys.dev">
          Edistys
        </a>
      </p>
    </div>
  </div>
</footer>
