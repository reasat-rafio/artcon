import { writable } from 'svelte/store';

type ImageAssetPos = { id: string; y: number };

type UIStore = {
  selectedPreviewIndex: number | null;
  containerWidth: number;
  mobileNavDropdownOpen: boolean;
  navItemsColor: string[];
  imageAssetPos: ImageAssetPos[];
};

const createUiStore = () => {
  const { subscribe, update } = writable<UIStore>({
    selectedPreviewIndex: null,
    containerWidth: 0,
    mobileNavDropdownOpen: false,
    navItemsColor: [],
    imageAssetPos: [],
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

  const setNavItemColorAtAIdx = (idx: number, data: string) => {
    update(($store) => {
      $store.navItemsColor[idx] = data;
      return $store;
    });
  };

  const pushActiveImageAssetPos = (data: ImageAssetPos) => {
    update(($store) => {
      $store.imageAssetPos.push(data);
      return $store;
    });
  };

  const removeActiveImageAssetPos = (id: string) => {
    update(($store) => {
      const idx = $store.imageAssetPos.findIndex((el) => el?.id === id);
      if (idx !== -1) $store.imageAssetPos.splice(idx, 1);
      return $store;
    });
  };

  return {
    subscribe,
    setActivePreview,
    setMobileNavDropdown,
    setContainerWidth,
    removeActiveImageAssetPos,
    toggleMobileNavDropdown,
    pushActiveImageAssetPos,
    setNavItemColorAtAIdx,
  };
};

const uiStore = createUiStore();

export default uiStore;
