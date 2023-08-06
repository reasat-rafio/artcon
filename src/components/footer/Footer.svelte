<script lang="ts">
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps, FooterProps } from '@/lib/types/common.types';
  import type { SanityAsset } from '@sanity/image-url/lib/types/types';
  import BodyText from '../ui/BodyText.svelte';
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import InfoBlock from './InfoBlock.svelte';
  import Address from './Address.svelte';

  export let footer: FooterProps;
  export let contact: ContactProps;
  export let logo: SanityAsset;
</script>

<footer>
  <div class="container border-t border-[#BBBBBE] py-[40px]">
    <section class="grid grid-cols-12 border-b border-[#EDEDEE] pb-[32px]">
      <div class="col-span-2 grid grid-cols-2">
        <figure>
          <SanityImage
            class="w-full object-contain"
            sizes="90px"
            src={logo}
            imageUrlBuilder={imageBuilder}
            alt="artcon logo"
          />
        </figure>
        <div />
      </div>

      <div class="col-span-6 grid grid-cols-12">
        <div class="col-span-10 flex flex-col justify-between">
          <BodyText weight="light">{footer.title}</BodyText>

          <div class="flex space-x-[40px]">
            {#each footer.menu as { title, externalUrl, pageUrl }}
              <a
                class="text-title-2 text-[#A5A5A8]"
                href={externalUrl || pageUrl}>{title}</a
              >
            {/each}
          </div>
        </div>
        <div class="col-span-2" />
      </div>

      <Address class="col-span-4 grid grid-cols-3" {contact} />
    </section>

    <section class="flex justify-between pt-[32px] text-[14px] text-[#A5A5A8]">
      <p>© ARTCON 2023</p>
      <p>Developed by Edistys</p>
    </section>
  </div>
</footer>
