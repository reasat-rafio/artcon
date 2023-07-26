<script lang="ts">
  import type { SummaryProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '../Quote.svelte';
  import VrExhibitionCta from '../VRExhibitionCTA.svelte';
  import DescriptionBlock from '../DescriptionBlock.svelte';
  import H4 from '../ui/H4.svelte';
  import BodyText from '../ui/BodyText.svelte';

  export let props: SummaryProps;
  let { quote, descriptionBlock, vrExhibitionnCta } = props;
</script>

<section>
  <div class="container">
    <Quote class="mb-xl" props={quote} />
    <DescriptionBlock description={descriptionBlock.description}>
      <div class="mb-10">
        <H4 class="text-dark-gunmetal">{descriptionBlock.name}</H4>

        <div>
          <!--  -->
        </div>
      </div>

      <div class="space-y-4">
        {#each descriptionBlock.moreInformations as { key, value }}
          <div class="">
            <BodyText weight="light" class="!leading-tight !text-sonic-silver"
              >{key}</BodyText
            >
            <BodyText weight="light">{value}</BodyText>
          </div>
        {/each}
      </div>
    </DescriptionBlock>
    <!-- <VrExhibitionCta props={vrExhibitionnCta} /> -->
  </div>
</section>
