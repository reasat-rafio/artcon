<script lang="ts">
  import H4 from '../ui/H4.svelte';
  import CardsContainer from './CardsContainer.svelte';
  import UserCard from './UserCard.svelte';

  export let title: string;
</script>

<div class={$$props.class ?? ''}>
  <H4 class="mb-md">{title}</H4>
  <slot name="list" {CardsContainer} Card={UserCard} />
</div>
