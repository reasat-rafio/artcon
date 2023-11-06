<script lang="ts">
  import type { ContactProps } from '@/lib/types/common.types';

  import InfoBlock from './InfoBlock.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import { getSocialIconPath } from '@/lib/helper';
  import PortableText from '@/lib/portable-text/PortableText.svelte';

  export let contact: ContactProps;

  let [firstSocialWLink, ...restSocialsWLink] = contact.socialsWithVisibleLinks;
</script>

<div class={$$props.class ?? ''}>
  <address class="col-span-3 space-y-[26px] text-[#1B1B1E]">
    <div
      class="flex space-x-[12px] text-[12px] font-light not-italic tracking-[0.24px]"
    >
      <figure>
        <SanityImage
          class="h-[0.938rem] w-[0.938rem]"
          src={contact.address.darkIcon}
          sizes="15px"
          alt={contact.address.darkIcon.alt}
          imageUrlBuilder={imageBuilder}
        />
      </figure>
      <div>
        <PortableText value={contact.address.address} />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-[1.62rem] sm:grid-cols-2">
      <InfoBlock
        extraLightHeight
        type={firstSocialWLink.type}
        info={firstSocialWLink.info}
      />

      <div class="space-y-[16px]">
        {#each restSocialsWLink as { type, info }}
          <InfoBlock {type} {info} />
        {/each}
      </div>
    </div>

    <ul class="flex space-x-[20px] md:ml-[30px]">
      {#each contact.socials as { type, link }}
        <li>
          <a href={link} target="_blank">
            <img
              class="h-[0.85938rem] w-[0.85938rem]"
              width="15px"
              height="15px"
              src="/icons/socials/dark/{getSocialIconPath(type)}"
              alt="{type}'s icon"
            />
          </a>
        </li>
      {/each}
    </ul>
  </address>
</div>
