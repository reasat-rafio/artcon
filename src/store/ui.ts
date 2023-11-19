import { writable } from 'svelte/store';

type UIStore = {
  selectedPreviewIndex: number | null;
  containerWidth: number;
};

const createUiStore = () => {
  const { subscribe, update } = writable<UIStore>({
    selectedPreviewIndex: null,
    containerWidth: 0,
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

  return {
    subscribe,
    setActivePreview,
    setContainerWidth: setContainerWidth,
  };
};

const uiStore = createUiStore();

export default uiStore;
