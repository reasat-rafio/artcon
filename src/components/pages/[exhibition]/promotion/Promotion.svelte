<script lang="ts">
  import type { PromotionProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '../../Quote.svelte';
  import Images from '../featured/Images.svelte';
  import DescriptionBlock from '@/components/DescriptionBlock.svelte';
  import H4 from '@/components/ui/H4.svelte';
  import BodyText from '@/components/ui/BodyText.svelte';
  import { PortableText } from '@portabletext/svelte';
  import Cta from '@/components/ui/Cta.svelte';

  export let props: PromotionProps;
  let {
    descriptionBlock: { title, cta, information, description, subtitle },
    images,
    quote,
  } = props;
</script>

<section>
  <div class="container pt-xl">
    <Quote class="mb-xl" {quote} />
    <Images class="mb-xl" {images} />

    <DescriptionBlock class="mb-xl" {description}>
      <div class="space-y-[36px]">
        <div class="space-y-2">
          <H4>{title}</H4>
          <BodyText>{subtitle}</BodyText>
        </div>
        <div class="text-title-2 !leading-relaxed">
          <PortableText value={information} />
        </div>
        <Cta href={cta.href}>
          {cta.title}
        </Cta>
      </div>
    </DescriptionBlock>
  </div>
</section>
