<script lang="ts">
  import parallaxAnimation from '@/lib/actions/parallaxAnimation';
  import type { contactSchema } from '@/lib/validator';
  import { fade } from 'svelte/transition';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import { toasts } from 'svelte-toasts';
  import Input from './Input.svelte';

  export let form: SuperForm<typeof contactSchema>;
  export let apiKey: string;

  const { form: f, errors, validate } = form;

  let submitting = false;

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const result = await validate();
    if (!result.valid) return;

    submitting = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: apiKey,
          from_name: 'Artcon Website Contact Form Submission',
          subject: 'Artcon Contact Inquiry',
          name: $f.name,
          email: $f.email,
          message: $f.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toasts.add({
          description: 'Form submitted successfully',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
        $f.name = '';
        $f.email = '';
        $f.message = '';
      } else {
        toasts.add({
          description:
            data.message || 'Failed to submit form. Please try again.',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toasts.add({
        description: 'Network error. Please try again.',
        duration: 3000,
        placement: 'bottom-right',
        theme: 'dark',
        type: 'error',
      });
    } finally {
      submitting = false;
    }
  }
</script>

<section
  use:parallaxAnimation
  class="container-primary pb-section relative translate-y-[120px]">
  <div class="w-full max-w-[64.125rem]">
    <form on:submit={handleSubmit} class="w-full space-y-[3.12rem]">
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
        disabled={submitting}
        type="submit">
        {#if submitting}
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