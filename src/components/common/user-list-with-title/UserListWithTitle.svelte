<script lang="ts">
  import CardsContainer from './CardsContainer.svelte';
  import UserCard from './UserCard.svelte';

  export let title: string;
</script>

<div class={$$props.class}>
  <h3 class="mb-md text-[2rem] tracking-[0.04rem]">{title}</h3>
  <slot name="list" {CardsContainer} Card={UserCard} />
</div>
