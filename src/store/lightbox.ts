import type { SanityImageAssetDocument } from '@sanity/client';
import { writable } from 'svelte/store';

type LightboxStore = {
  showLightbox: boolean;
  allImages: SanityImageAssetDocument[];
  activeIndex: number;
};

const createLightboxStore = () => {
  const { subscribe, update } = writable<LightboxStore>({
    showLightbox: false,
    allImages: [],
    activeIndex: 0,
  });

  const setAllImages = (images: SanityImageAssetDocument[]) => {
    update(($store) => {
      $store.allImages = images;
      return $store;
    });
  };

  const setActiveIndex = (activeIndex: number) => {
    update(($store) => {
      $store.activeIndex = activeIndex;
      return $store;
    });
  };

  const setLightboxVisibility = (input: boolean) => {
    update(($store) => {
      $store.showLightbox = input;
      return $store;
    });
  };

  return {
    subscribe,
    setAllImages,
    setActiveIndex,
    setLightboxVisibility,
  };
};

const lightboxStore = createLightboxStore();

export default lightboxStore;
