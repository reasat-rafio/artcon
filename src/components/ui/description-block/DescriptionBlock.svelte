<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Description from './Description.svelte';
  import HeaderContainer from './HeaderContainer.svelte';
  import Social from './Social.svelte';
  import SocialContainer from './SocialContainer.svelte';
  import Subtitle from './Subtitle.svelte';
  import Title from './Title.svelte';
</script>

<article
  class={twMerge(
    'grid w-full grid-cols-12 gap-[1.25rem] sm:gap-[2.5rem] xl:gap-[3.125rem] xl:pr-[9.69rem]',
    $$props.class,
  )}
>
  <div class="col-span-12 lg:col-span-5 xl:col-span-4">
    <slot
      name="intro"
      C={{
        Title,
        Subtitle,
        HeaderContainer,
        SocialContainer,
        Social,
      }}
    />
  </div>
  <div class="col-span-12 lg:col-span-7 xl:col-span-8">
    <slot name="description" {Description} />
  </div>
</article>
