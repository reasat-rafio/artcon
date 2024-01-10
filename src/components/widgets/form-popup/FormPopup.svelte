<script lang="ts">
  import type { inquirySchema } from '@/lib/validator';
  import formPopupStore from '@/store/form-popup-store';
  import { fade, scale, blur } from 'svelte/transition';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import Input from './Input.svelte';
  import { cn } from '@/lib/cn';

  export let form: SuperForm<typeof inquirySchema>;
  export let formMessage: undefined | string;

  const { form: f, errors, enhance, delayed } = form;
  let successEl: HTMLElement;

  function clearForm() {
    f.update(() => ({
      email: '',
      subject: '',
      message: '',
      name: '',
      phone: '',
    }));
  }
</script>

<div
  tabindex="0"
  role="button"
  aria-label="backdrop"
  on:click={() => formPopupStore.setFormPopupVisibility(false)}
  on:keypress={() => formPopupStore.setFormPopupVisibility(false)}
  class="fixed inset-0 w-full h-full cursor-default z-demigod bg-black-800/50 backdrop-blur-xl"
  transition:fade />

<div
  in:scale={{ delay: 200 }}
  out:blur
  class="fixed left-1/2 top-1/2 z-god h-min max-h-[calc(100vh-1.5rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
  <form
    method="POST"
    use:enhance
    class="w-full space-y-[32px] rounded-[12px] bg-white max-lg:px-[20px] max-lg:py-[50px] lg:max-w-3xl lg:p-[50px]"
    style="box-shadow: 0px 30px 60px 0px rgba(89, 86, 230, 0.10);">
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

    <Input
      label="Subject of Inquiry"
      name="subject"
      bind:value={$f.subject}
      error={$errors.subject}
      placeholder="subject you want to talk" />

    <div class="flex w-full flex-col space-y-[16px]">
      <label class="text-[16px] font-semibold" for="message">Message</label>
      <div>
        <textarea
          name="message"
          placeholder="type your massage here"
          id="message"
          bind:value={$f.message}
          rows="5"
          class="border-black/10 placeholder:text-black/20 w-full rounded-[8px] border-[1.5px] bg-white/10 px-[16px] py-[12px] placeholder:text-[14px]" />
        {#if $errors.message}
          <small class="text-red-600">{$errors.message}</small>
        {/if}
      </div>
    </div>

    <div class="flex space-x-[16px] lg:space-x-[32px]">
      <button
        disabled={$delayed}
        type="submit"
        class={cn(
          'gradient-purple-blue-90 hover:shadow-cta block w-fit rounded-[12px] bg-left px-[18px] py-[13px] text-[16px] font-medium tracking-[0.48px] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-right md:px-[32px]',
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
            class="inline object-contain w-4 h-4"
            src="/icons/message.svg"
            alt="Send Message" />
        {/if}
        <span class="inline">Send Message</span>
      </button>
      <button
        on:click={clearForm}
        disabled={$delayed}
        class="border-black/20 text-black/20 block w-fit rounded-[12px] border bg-[length:125%] bg-left px-[18px] py-[13px] text-[16px] font-medium tracking-[0.48px] transition-all duration-300 hover:scale-[1.01] hover:border-red-600 hover:bg-right hover:text-red-600 hover:shadow-xl md:px-[32px]">
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
