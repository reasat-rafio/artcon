import type { SanityImageAssetDocument } from '@sanity/client';
import { writable } from 'svelte/store';

type ImagePopupStore = {
  show: boolean;
  image: SanityImageAssetDocument | null;
  caption: string | null;
};

const createImagePopupStore = () => {
  const { subscribe, update } = writable<ImagePopupStore>({
    show: false,
    image: null,
    caption: null,
  });

  const setImage = (image: SanityImageAssetDocument, caption: string) => {
    update(($store) => {
      $store.image = image;
      $store.caption = caption;
      return $store;
    });
  };

  const setVisibility = (input: boolean) => {
    update(($store) => {
      $store.show = input;
      return $store;
    });
  };

  return {
    subscribe,
    setImage,
    setVisibility,
  };
};

const imagePopupStore = createImagePopupStore();

export default imagePopupStore;
