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

<div class={cn('w-full lg:pt-[0.75rem]', $$props.class)}>
  <address class="flex flex-col gap-y-[1.62rem] text-eerie-black">
    <div class="sub-title-light flex gap-x-[0.75rem] not-italic 2xl:pr-[5rem]">
      <figure>
        <SanityImage
          class="w-[13px] object-contain"
          src={contact.address.darkIcon}
          sizes="20px"
          alt={contact.address.darkIcon.alt}
          imageUrlBuilder={imageBuilder} />
      </figure>
      <div>
        <PortableText value={contact.address.address} />
      </div>
    </div>

    <div
      class="grid grid-cols-1 max-xl:gap-y-[1.62rem] xl:grid-cols-2 xl:gap-x-[2.29rem] 3xl:translate-y-[-5px]">
      <InfoBlock
        iconStyle="3xl:translate-y-[5px]"
        type={firstSocialWLink.type}
        info={firstSocialWLink.info} />

      <div class="flex flex-col gap-y-[1.62rem] xl:gap-y-[0.75rem]">
        {#each restSocialsWLink as { type, info }}
          <InfoBlock class="items-center " {type} {info} />
        {/each}
      </div>
    </div>

    <ul class="flex gap-x-[1rem] lg:pl-[1.2rem] 3xl:translate-y-[-10px]">
      {#each contact.socials as { type, link }}
        <li>
          <a href={link} target="_blank">
            <img
              class="h-[15px] object-contain"
              width="20px"
              height="20px"
              src="/icons/socials/black/{getSocialIconPath(type)}"
              alt="{type}'s icon" />
          </a>
        </li>
      {/each}
    </ul>
  </address>
</div>
