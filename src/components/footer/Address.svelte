<script lang="ts">
  import type { ContactProps } from '@/lib/types/common.types';

  import InfoBlock from './InfoBlock.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  export let contact: ContactProps;

  let [firstSocialWLink, ...restSocialsWLink] = contact.socialsWithVisibleLinks;
</script>

<div class={$$props.class ?? ''}>
  <address class="col-span-2 space-y-[26px] text-[#1B1B1E]">
    <InfoBlock icon={contact.address.icon} info={contact.address.address} />

    <div class="grid grid-cols-2">
      <InfoBlock
        extraLightHeight
        icon={firstSocialWLink.icon}
        info={firstSocialWLink.info}
      />

      <div class="space-y-[16px]">
        {#each restSocialsWLink as { icon, info }}
          <InfoBlock {icon} {info} />
        {/each}
      </div>
    </div>

    <ul class="ml-[30px] flex space-x-[20px]">
      {#each contact.socials as { icon, link }}
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
  </address>
  <div class="col-span-1" />
</div>
