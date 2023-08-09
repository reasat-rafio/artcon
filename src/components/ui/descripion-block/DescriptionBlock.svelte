<script lang="ts">
  import BodyText from '../BodyText.svelte';
  import Cta from '../Cta.svelte';
  import H4 from '../H4.svelte';
  import DescriptionContainer from './DescriptionContainer.svelte';
  import HeaderContainer from './HeaderContainer.svelte';
  import IntroContainer from './IntroContainer.svelte';
  import PortableTextBlock from './PortableTextBlock.svelte';
  import Social from './Social.svelte';
  import SocialContainer from './SocialContainer.svelte';
  import { PortableText } from '@portabletext/svelte';
</script>

<article class="{$$props.class ?? ''} grid w-[85%] grid-cols-12 gap-[50px]">
  <slot
    name="intro"
    C={{
      Title: H4,
      Subtitle: BodyText,
      HeaderContainer,
      IntroContainer,
      SocialContainer,
      Social,
      PortableTextBlock,
      Cta,
    }}
  />
  <slot
    name="description"
    C={{
      DescriptionContainer,
      Description: BodyText,
      PortableTextBlock: PortableText,
    }}
  />
</article>
