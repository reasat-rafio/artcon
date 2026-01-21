import type { SanityImageAssetDocument } from '@sanity/client';
import { writable } from 'svelte/store';

type LightboxStore = {
  showLightbox: boolean;
  allImages: SanityImageAssetDocument[];
  activeIndex: number;
  hideThumbnails: boolean;
  allTitles: string[];
};

const createLightboxStore = () => {
  const { subscribe, update } = writable<LightboxStore>({
    showLightbox: false,
    allImages: [],
    activeIndex: 0,
    hideThumbnails: false,
    allTitles: [],
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

  const setAllTitles = (titles: string[]) => {
    update(($store) => {
      $store.allTitles = titles;
      return $store;
    });
  };

  return {
    subscribe,
    setAllImages,
    setActiveIndex,
    setLightboxVisibility,
    setHideThumbnails,
    setAllTitles,
  };
};

const lightboxStore = createLightboxStore();

export default lightboxStore;
