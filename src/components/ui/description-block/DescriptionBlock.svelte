<script lang="ts">
  import Description from './Description.svelte';
  import HeaderContainer from './HeaderContainer.svelte';
  import Social from './Social.svelte';
  import SocialContainer from './SocialContainer.svelte';
  import Subtitle from './Subtitle.svelte';
  import Title from './Title.svelte';
  import { cn } from '@/lib/cn';
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
</script>

<article
  use:parallaxAnimation
  class={cn(
    'flex w-full max-w-full translate-y-[120px] flex-col lg:flex-row',
    $$props.class,
  )}>
  <div class="w-full max-lg:pb-[2.5rem] lg:mr-[3.125rem] lg:w-[31.06%]">
    <slot
      name="intro"
      C={{
        Title,
        Subtitle,
        HeaderContainer,
        SocialContainer,
        Social,
      }} />
  </div>
  <div class="flex-1 max-w-full xl:pr-[3rem]">
    <slot name="description" {Description} />
  </div>
</article>
