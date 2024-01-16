<script lang="ts">
  import Seo from '@/components/common/Seo.svelte';
  import Footer from '@/components/common/footer/Footer.svelte';
  import Cta from '@/components/ui/Cta.svelte';
  import DescriptionBlock from '@/components/ui/description-block/DescriptionBlock.svelte';
  import FormPopup from '@/components/widgets/form-popup/FormPopup.svelte';
  import PortableText from '@/lib/portable-text/PortableText.svelte';
  import type { SeoProps } from '@/lib/types/common.types';
  import { inquirySchema } from '@/lib/validator';
  import formPopupStore from '@/store/form-popup-store';
  import type { PortableTextBlock } from 'sanity';
  import { superForm, type FormResult } from 'sveltekit-superforms/client';
  import type { ActionData } from './$types';
  import { toasts } from 'svelte-toasts';

  type Props = {
    seo: SeoProps;
    title: string;
    privacyPolicy: PortableTextBlock[];
  };

  export let data;

  $: ({
    page: { seo, privacyPolicy, title },
    site: {
      logos: { logoDark, ogImage },
      footer,
      contact,
    },
  } = data);

  const f = superForm(data.form, {
    validators: inquirySchema,
    resetForm: true,
    onResult: (event) => {
      const result = event.result as FormResult<ActionData>;

      if (result.type === 'success') {
        formPopupStore.setFormPopupVisibility(false);

        toasts.add({
          description: 'Form submitted successfully',
          duration: 3000,
          placement: 'bottom-right',
          theme: 'dark',
          type: 'success',
        });
      }
    },
  });
</script>

<Seo {seo} siteOgImg={ogImage} />
<div class="container-primary py-[7rem] lg:py-xl">
  <DescriptionBlock class="max-lg:mb-section">
    <svelte:fragment slot="intro" let:C>
      <C.Title class="lg:mb-10">{title}</C.Title>
    </svelte:fragment>
    <svelte:fragment slot="description" let:Description>
      <Description>
        <PortableText value={privacyPolicy} />
      </Description>

      <Cta
        el="button"
        onClick={() => formPopupStore.setFormPopupVisibility(true)}
        className="mt-[3.12rem] block border-raisin-black text-raisin-black">
        Contact us
      </Cta>
    </svelte:fragment>
  </DescriptionBlock>
</div>
<Footer {footer} {contact} logo={logoDark} />

{#if $formPopupStore.show}
  <FormPopup
    form={f}
    contextMessage={`User pressed "Contact Us" in privacy policy page.`} />
{/if}
