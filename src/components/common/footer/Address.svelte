<script lang="ts">
  import { cn } from '@/lib/cn';
  import { getSocialIconPath } from '@/lib/helper';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { ContactProps } from '@/lib/types/common.types';
  import InfoBlock from './InfoBlock.svelte';

  export let contact: ContactProps;

  let [firstSocialWLink, ...restSocialsWLink] = contact.socialsWithVisibleLinks;
</script>

<div class={cn('3xl:pr-[4.71rem] w-full lg:pt-[0.75rem]', $$props.class)}>
  <address class="text-eerie-black flex flex-col gap-y-[1.62rem]">
    <div class="sub-title-light flex gap-x-[0.75rem] not-italic 2xl:pr-[5rem]">
      <figure>
        <SanityImage
          class="h-[0.938rem] w-[0.938rem] object-contain pt-[2.5px]"
          src={contact.address.darkIcon}
          sizes="15px"
          alt={contact.address.darkIcon.alt}
          imageUrlBuilder={imageBuilder} />
      </figure>
      <div>
        <PortableText value={contact.address.address} />
      </div>
    </div>

    <div
      class="grid grid-cols-1 max-xl:gap-y-[1.62rem] xl:grid-cols-2 xl:gap-x-[2.29rem]">
      <InfoBlock type={firstSocialWLink.type} info={firstSocialWLink.info} />

      <div class="flex flex-col gap-y-[1.62rem] xl:gap-y-[1rem]">
        {#each restSocialsWLink as { type, info }}
          <InfoBlock {type} {info} />
        {/each}
      </div>
    </div>

    <ul class="flex space-x-[1.25rem] lg:pl-[1.4375rem]">
      {#each contact.socials as { type, link }}
        <li>
          <a href={link} target="_blank">
            <img
              class="h-[0.85938rem] w-[0.85938rem]"
              width="15px"
              height="15px"
              src="/icons/socials/black/{getSocialIconPath(type)}"
              alt="{type}'s icon" />
          </a>
        </li>
      {/each}
    </ul>
  </address>
</div>
