<script lang="ts">
  import type { NoteProps } from '@/lib/types/exhibitionDetail.types';
  import Quote from '@/components/Quote.svelte';
  import DescriptionBlock from '@/components/ui/descripion-block/DescriptionBlock.svelte';

  export let props: NoteProps;
  let { notes } = props;
</script>

<section class="py-xl">
  <div class="container">
    {#each notes as { quote, descriptionBlock: { title, subtitle, description } }}
      <div>
        <Quote class="mb-xl" {quote} />

        <DescriptionBlock class="mb-xl">
          <svelte:fragment
            slot="intro"
            let:IntroContainer
            let:HeaderContainer
            let:Title
          >
            <IntroContainer>
              <HeaderContainer>
                <Title>{title}</Title>
              </HeaderContainer>
            </IntroContainer>
          </svelte:fragment>
          <svelte:fragment
            slot="description"
            let:DescriptionContainer
            let:Description
          >
            <DescriptionContainer>
              <Description>{description}</Description>
            </DescriptionContainer>
          </svelte:fragment>
        </DescriptionBlock>
      </div>
    {/each}
  </div>
</section>
