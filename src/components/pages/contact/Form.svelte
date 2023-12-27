<script lang="ts">
  import type { contactSchema } from '@/lib/validator';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import Input from './Input.svelte';
  import { fade } from 'svelte/transition';

  export let form: SuperForm<typeof contactSchema>;
  export let formMessage: undefined | string;

  const { form: f, errors, enhance, delayed } = form;
</script>

<section class="container-primary relative">
  {#if !!formMessage}
    <div
      transition:fade
      class="absolute left-0 top-0 -translate-y-full pb-2 max-lg:px-[1rem]">
      <h2
        class="text-[1rem] font-medium leading-[115.5%] tracking-[0.04rem] text-sonic-silver md:text-[1.5rem] xl:text-[2rem]">
        {formMessage}
      </h2>
    </div>
  {/if}

  <div class="w-full max-w-[64.125rem]">
    <form use:enhance class="w-full space-y-[3.12rem]" method="POST">
      <div class="grid grid-cols-2 gap-[1.88rem]">
        <Input
          bind:value={$f.name}
          placeholder="Your name"
          name="name"
          class="col-span-2 lg:col-span-1"
          error={$errors.name} />
        <Input
          bind:value={$f.email}
          placeholder="Your mail address"
          name="email"
          class="col-span-2 lg:col-span-1"
          error={$errors.email} />
        <div class="relative col-span-2">
          <textarea
            id="message"
            bind:value={$f.message}
            name="message"
            rows="20"
            placeholder="Type you massage here"
            class:!border-red-500={!!$errors?.message?.length}
            class="form bg w-full" />

          {#if !!$errors?.message}
            <small
              transition:fade
              class="absolute bottom-0 left-0 translate-y-full pl-[calc(1.87rem/2)] text-xs text-red-600">
              {$errors?.message}
            </small>
          {/if}
        </div>
      </div>
      <button
        class="rounded-2xl border border-raisin-black px-[1.3125rem] py-[0.8125rem] text-[0.84375rem] text-raisin-black"
        disabled={$delayed}
        type="submit">
        {#if $delayed}
          <span class="animate-pulse">Sending...</span>
        {:else}
          Send massage
        {/if}
      </button>
    </form>
  </div>
</section>

<style lang="postcss">
  .form {
    @apply rounded-[1.25rem] border border-light-gray pb-[1.62rem] pl-[1.87rem] pt-[1.69rem] text-[1rem] leading-[120%];
  }
  .bg {
    background: linear-gradient(
      270deg,
      rgba(29, 29, 37, 0.08) 0%,
      rgba(29, 29, 37, 0.04) 100%
    );
  }
</style>
