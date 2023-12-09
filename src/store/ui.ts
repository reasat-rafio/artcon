import { writable } from 'svelte/store';

type UIStore = {
  selectedPreviewIndex: number | null;
  containerWidth: number;
  mobileNavDropdownOpen: boolean;
};

const createUiStore = () => {
  const { subscribe, update } = writable<UIStore>({
    selectedPreviewIndex: null,
    containerWidth: 0,
    mobileNavDropdownOpen: false,
  });

  const setActivePreview = (activeIndexOrNull: number | null) => {
    update(($store) => {
      $store.selectedPreviewIndex = activeIndexOrNull;
      return $store;
    });
  };
  const setContainerWidth = (width: number) => {
    update(($store) => {
      $store.containerWidth = width;
      return $store;
    });
  };

  const toggleMobileNavDropdown = () => {
    update(($store) => {
      $store.mobileNavDropdownOpen = !$store.mobileNavDropdownOpen;
      return $store;
    });
  };

  const setMobileNavDropdown = (open: boolean) => {
    update(($store) => {
      $store.mobileNavDropdownOpen = open;
      return $store;
    });
  };

  return {
    subscribe,
    setActivePreview,
    toggleMobileNavDropdown,
    setMobileNavDropdown,
    setContainerWidth,
  };
};

const uiStore = createUiStore();

export default uiStore;
