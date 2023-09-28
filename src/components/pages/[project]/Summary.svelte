<script lang="ts">
  import Quote from '@/components/Quote.svelte';
  import VR from '@/components/VR.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';
  import type { SummaryProps } from '@/lib/types/projectDetail.types';
  import { PortableText } from '@portabletext/svelte';

  export let props: SummaryProps & {
    date: string;
  };

  $: ({ quote, vr, descriptionBlock, date } = props);
</script>

<section class="py-section">
  <div class="container">
    <Quote class="mb-section" {quote} />

    <DescriptionBlock class="mb-section">
      <svelte:fragment slot="intro" let:C>
        <div class="pb-[2rem]">
          <C.Title>{descriptionBlock.name}</C.Title>
          <C.Subtitle>{date}</C.Subtitle>
        </div>
        <div class="space-y-4">
          {#each descriptionBlock.moreInformations as { key, value }}
            <div>
              <C.Subtitle class="!leading-tight !text-sonic-silver"
                >{key}</C.Subtitle
              >
              <C.Subtitle>{value}</C.Subtitle>
            </div>
          {/each}
        </div>
      </svelte:fragment>
      <svelte:fragment slot="description" let:Description>
        <Description>
          <PortableText value={descriptionBlock.description} />
        </Description>
      </svelte:fragment>
    </DescriptionBlock>

    <!-- <VR {vr} /> -->
  </div>
</section>
