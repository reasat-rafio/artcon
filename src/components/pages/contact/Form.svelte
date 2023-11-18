<script lang="ts">
  import type { contactSchema } from '@/lib/validator';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import Input from './Input.svelte';
  import { fade } from 'svelte/transition';

  export let form: SuperForm<typeof contactSchema>;
  export let formMessage: undefined | string;

  const { form: f, errors, enhance, delayed } = form;

  //   const clearForm = () =>
  //     f.update(() => ({
  //       email: '',
  //       message: '',
  //       name: '',
  //     }));
</script>

<section class="container-primary">
  <div class="w-full max-w-[64.125rem]">
    <form use:enhance class="w-full space-y-[3.12rem]" method="POST">
      <div class="grid grid-cols-2 gap-[1.88rem]">
        <Input
          bind:value={$f.name}
          placeholder="Your name"
          name="name"
          class="col-span-1"
          error={$errors.name} />
        <Input
          bind:value={$f.email}
          placeholder="Your mail address"
          name="email"
          class="col-span-1"
          error={$errors.email} />
        <div class="relative col-span-2">
          <textarea
            id="message"
            bind:value={$f.message}
            name="massage"
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
        class="rounded-[4rem] border border-[#1D1D25] px-[1.3125rem] py-[0.8125rem] text-[0.84375rem] text-[#1D1D25]"
        disabled={$delayed}
        type="submit">
        Send massage
      </button>
    </form>
  </div>
</section>

<style lang="postcss">
  .form {
    @apply rounded-[1.25rem] border border-[#D2D2D3] pb-[1.62rem] pl-[1.87rem] pt-[1.69rem] text-[1rem] leading-[120%];
  }
  .bg {
    background: linear-gradient(
      270deg,
      rgba(29, 29, 37, 0.08) 0%,
      rgba(29, 29, 37, 0.04) 100%
    );
  }
</style>
