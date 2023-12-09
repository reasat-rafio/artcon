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

<!-- <footer>
  <div
    class="container-primary py-section py-section border-t border-[#BBBBBE] pt-[2.5rem]"
  >
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
            alt="Artcon logo"
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
</footer> -->

<footer>
  <div class="container-primary">
    <div
      class="flex flex-col border-t border-[#A5A5A8] pb-[2rem] pt-[2.6875rem] max-lg:flex-wrap lg:flex-row">
      <figure class="max-lg:pb-[1.56rem] lg:pr-[5%] 2xl:pr-[6.125rem]">
        <SanityImage
          class="w-full object-contain max-lg:max-h-[3.125rem] max-lg:max-w-[5.30819rem]"
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
              class="title-regular text-[#A5A5A8]"
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
          <a class="title-regular text-[#A5A5A8]" href={externalUrl || pageUrl}>
            {title}
          </a>
        {/each}
      </div>
    </div>
    <div
      class="flex flex-col justify-between border-t border-[#D2D2D3] pb-[1.5rem] pt-[1.56rem] max-lg:space-y-[0.63rem] lg:flex-row lg:items-center lg:pb-[2.5rem] lg:pt-[2rem]">
      <p class="title-regular text-[#A5A5A8]">© ARTCON 2023</p>
      <p class="title-light text-[#A5A5A8]">Developed by Edistys</p>
    </div>
  </div>
</footer>
