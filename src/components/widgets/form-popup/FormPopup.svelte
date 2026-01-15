<script lang="ts">
  import type { inquirySchema } from '@/lib/validator';
  import formPopupStore from '@/store/form-popup';
  import { fade, scale, blur } from 'svelte/transition';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import Input from './Input.svelte';
  import { cn } from '@/lib/cn';
  import XIcon from '@/components/icons/X.svelte';
  import Backdrop from '@/components/common/Backdrop.svelte';
  import { onMount } from 'svelte';
  import { toasts } from 'svelte-toasts';

  export let form: SuperForm<typeof inquirySchema>;
  export let contextMessage: string;
  export let onFormSuccess: (() => void) | undefined = undefined;

  const { form: f, errors, enhance, delayed, reset } = form;

  onMount(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  function closeFormPopup() {
    formPopupStore.setFormPopupVisibility(false);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') closeFormPopup();
  }

  function clearForm() {
    reset();
  }

  // Custom enhance function that shows toasts
  function handleEnhance() {
    return async ({ result, update }: any) => {
      console.log('Enhance callback triggered');
      console.log('Result type:', result?.type);
      console.log('Result:', result);

      await update();

      if (result?.type === 'success') {
        console.log('FormPopup: Success detected');
        toasts.add({
          description: 'Form submitted successfully',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
        setTimeout(() => {
          formPopupStore.setFormPopupVisibility(false);
          if (onFormSuccess) onFormSuccess();
        }, 500);
      } else if (result?.type === 'failure') {
        console.log('FormPopup: Failure detected');
        const errorMsg = (result as any)?.data?.error || 'Failed to submit form';
        console.log('Error message:', errorMsg);
        toasts.add({
          description: errorMsg,
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'error',
        });
      } else if (result?.type === 'error') {
        console.log('FormPopup: Error detected');
        toasts.add({
          description: 'An error occurred',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'error',
        });
      }
    };
  }

  function onFormSubmit() {
    console.log('Form data:', {
      name: $f.name,
      email: $f.email,
      phone: $f.phone,
      message: $f.message,
      context: $f.context,
    });
  }

  $: if (contextMessage) {
    $f.context = contextMessage;
  }

</script>

<Backdrop on:close={closeFormPopup} />

<div
  in:scale={{ delay: 200, duration: 300 }}
  out:blur
  class="fixed left-1/2 top-1/2 z-god h-min max-h-[calc(100dvh-1.5rem)] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-lg:px-5 lg:max-w-xl">
  <form
    method="POST"
    use:enhance
    on:submit={onFormSubmit}
    class="relative flex !w-full flex-col gap-y-[2rem] rounded-[0.75rem] bg-white max-lg:px-[1.25rem] max-lg:py-[3.125rem] lg:p-[3.125rem]"
    style="box-shadow: 0px 30px 60px 0px rgba(89, 86, 230, 0.10);">
    <button
      on:click|preventDefault={() =>
        formPopupStore.setFormPopupVisibility(false)}
      class="absolute right-4 top-4 transition-transform duration-300 hover:scale-150">
      <XIcon />
    </button>

    <Input
      label="Name"
      name="name"
      bind:value={$f.name}
      error={$errors.name}
      placeholder="your name" />
    <Input
      label="Phone number"
      name="phone"
      bind:value={$f.phone}
      error={$errors.phone}
      placeholder="your phone number" />
    <Input
      label="Email"
      name="email"
      bind:value={$f.email}
      error={$errors.email}
      placeholder="your email" />

    <!-- Hidden field for context -->
    <input type="hidden" name="context" bind:value={$f.context} />

    <div class="flex w-full flex-col gap-y-[1rem]">
      <label class="text-[1rem] font-semibold" for="message">Message</label>
      <div>
        <textarea
          name="message"
          placeholder="type your massage here"
          id="message"
          bind:value={$f.message}
          rows="5"
          class="border-black/10 placeholder:text-black/20 w-full rounded-[8px] border-[1.5px] bg-white/10 px-[1rem] py-[12px] placeholder:text-[0.875rem]" />
        {#if $errors.message}
          <small class="text-red-600">{$errors.message}</small>
        {/if}
      </div>
    </div>

    <div class="flex flex-col-reverse gap-[1rem] sm:flex-row lg:gap-[2rem]">
      <button
        on:click={() => console.log('BUTTON CLICK - delayed:', $delayed, 'Form valid:', !$errors.name && !$errors.email && !$errors.phone && !$errors.message)}
        disabled={$delayed}
        type="submit"
        class={cn(
          'gradient-purple-blue-90 hover:shadow-cta block w-full rounded-[12px] bg-left px-[18px] py-[13px] text-[1rem] font-medium tracking-[0.48px] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-right sm:w-fit md:px-[2rem]',
          'flex-1 space-x-[10px]',
        )}>
        {#if $delayed}
          <div
            class="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        {:else}
          <img
            loading="lazy"
            class="inline h-4 w-4 object-contain"
            src="/icons/message.svg"
            alt="Send Message" />
        {/if}
        <span class="inline">Send Message</span>
      </button>
      <button
        type="button"
        on:click={clearForm}
        disabled={$delayed}
        class="border-black/20 text-black/20 block w-full rounded-[12px] border bg-[length:125%] bg-left px-[18px] py-[13px] text-[16px] font-medium tracking-[0.48px] transition-all duration-300 hover:scale-[1.01] hover:border-red-600 hover:bg-right hover:text-red-600 hover:shadow-xl sm:w-fit md:px-[32px]">
        Clear
      </button>
    </div>
  </form>
</div>

<style>
  .gradient-purple-blue-90 {
    background-image: linear-gradient(90deg, #ed1c24 0%, #ea234080 127.39%);
  }
  .gradient-purple-blue-180 {
    background-image: linear-gradient(180deg, #ed1c24 0%, #ea234080 127.39%);
  }
</style>
