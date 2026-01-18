import type { SanityImageAssetDocument } from '@sanity/client';
import { writable } from 'svelte/store';

type LightboxStore = {
  showLightbox: boolean;
  allImages: SanityImageAssetDocument[];
  activeIndex: number;
  hideThumbnails: boolean;
};

const createLightboxStore = () => {
  const { subscribe, update } = writable<LightboxStore>({
    showLightbox: false,
    allImages: [],
    activeIndex: 0,
    hideThumbnails: false,
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
      if (!input) {
        $store.hideThumbnails = false;
      }
      return $store;
    });
  };

  const setHideThumbnails = (input: boolean) => {
    update(($store) => {
      $store.hideThumbnails = input;
      return $store;
    });
  };

  return {
    subscribe,
    setAllImages,
    setActiveIndex,
    setLightboxVisibility,
    setHideThumbnails,
  };
};

const lightboxStore = createLightboxStore();

export default lightboxStore;
