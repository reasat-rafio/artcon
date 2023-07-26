<script lang="ts">
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import Quote from '@/components/Quote.svelte';
  import BodyText from '@/components/ui/BodyText.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import SanityImage from '@/lib/sanity/sanity-image/sanity-image.svelte';
  import { imageBuilder } from '@/lib/sanity/sanityClient';
  import type { SoloExhibiton } from '@/lib/types/exhibitionDetail.types';
  import Images from './Images.svelte';

  export let props: SoloExhibiton;
  let { quote, vrExhibitionnCta, descriptionBlock, images, statement } = props;
</script>

<div>
  <Quote class="my-xl" {quote} />

  <DescriptionBlock class="my-xl" description={descriptionBlock.description}>
    <div class="mb-[23px] space-y-2">
      <H4>{descriptionBlock.name}</H4>
      <BodyText weight="light">{descriptionBlock.subtile}</BodyText>
    </div>

    <div class="flex flex-wrap space-x-[20px]">
      {#each descriptionBlock.socials as { link, icon }}
        <a href={link} target="_blank">
          <SanityImage
            alt={link}
            src={icon}
            sizes="15px"
            class="h-[15px] w-[15px]"
            imageUrlBuilder={imageBuilder}
          />
        </a>
      {/each}
    </div>
  </DescriptionBlock>

  <Images class="mb-xl" {images} />

  <DescriptionBlock class="mb-xl" description={statement.statement}>
    <H4>{statement.title}</H4>
  </DescriptionBlock>
</div>
