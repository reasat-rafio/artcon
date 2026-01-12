<script lang="ts">
  import Quote from '@/components/common/Quote.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { CommonNoteProps } from '@/lib/types/common.types';

  export let props: CommonNoteProps;
  $: ({ notes } = props);
</script>

<section>
  <div class="pt-section container-primary {$$props.class}">
    {#each notes as { quote, descriptionBlock: { title, subtitle, description } }, index}
      <div>
        {#if !!quote}
          <Quote class="mb-section" {quote} />
        {/if}

        <DescriptionBlock
          class={index + 1 !== notes.length ? 'mb-section' : ''}>
          <svelte:fragment slot="intro" let:C>
            <C.HeaderContainer>
              <C.Title>{title}</C.Title>
              {#if subtitle}
                <C.Subtitle class="!text-[0.875rem]">{subtitle}</C.Subtitle>
              {/if}
            </C.HeaderContainer>
          </svelte:fragment>
          <svelte:fragment slot="description" let:Description>
            <Description>
              <PortableText value={description} />
            </Description>
          </svelte:fragment>
        </DescriptionBlock>
      </div>
    {/each}
  </div>
</section>
