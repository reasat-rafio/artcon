<script lang="ts">
  import type { NoteProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '../Quote.svelte';
  import DescriptionBlock from '../DescriptionBlock.svelte';
  import H4 from '../ui/H4.svelte';
  import BodyText from '../ui/BodyText.svelte';

  export let props: NoteProps;
  let { notes } = props;
</script>

<section>
  <div class="container pt-xl">
    {#each notes as { quote, descriptionBlock: { title, subtitle, description } }}
      <div>
        <Quote class="mb-xl" {quote} />
        <DescriptionBlock class="mb-xl" {description}>
          <H4>{title}</H4>
          <BodyText>{subtitle}</BodyText>
        </DescriptionBlock>
      </div>
    {/each}

    <!--  -->
  </div>
</section>
