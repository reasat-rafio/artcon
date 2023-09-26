<script lang="ts">
  import type { ContactProps } from '@/lib/types/common.types';

  import InfoBlock from './InfoBlock.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';

  export let contact: ContactProps;

  let [firstSocialWLink, ...restSocialsWLink] = contact.socialsWithVisibleLinks;
</script>

<div class={$$props.class ?? ''}>
  <address class="col-span-3 space-y-[26px] text-[#1B1B1E] 2xl:col-span-2">
    <InfoBlock icon={contact.address.darkIcon} info={contact.address.address} />

    <div class="grid grid-cols-1 gap-[1.62rem] sm:grid-cols-2">
      <InfoBlock
        extraLightHeight
        icon={firstSocialWLink.darkIcon}
        info={firstSocialWLink.info}
      />

      <div class="space-y-[16px]">
        {#each restSocialsWLink as { darkIcon, info }}
          <InfoBlock icon={darkIcon} {info} />
        {/each}
      </div>
    </div>

    <ul class="flex space-x-[20px] md:ml-[30px]">
      {#each contact.socials as { darkIcon, link }}
        <li>
          <a href={link} target="_blank">
            <SanityImage
              class="h-[15px] w-[15px]"
              src={darkIcon}
              sizes="15px"
              alt={link}
              imageUrlBuilder={imageBuilder}
            />
          </a>
        </li>
      {/each}
    </ul>
  </address>
  <div class="hidden 2xl:col-span-1 2xl:block" />
</div>
