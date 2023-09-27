import { writable } from 'svelte/store';

type UIStore = {
  seclectedPreviewIndex: number | null;
  containerWidth: number;
};

const createUiStore = () => {
  const { subscribe, update } = writable<UIStore>({
    seclectedPreviewIndex: null,
    containerWidth: 0,
  });

  const setActivePreview = (acitveIndexOrNull: number | null) => {
    update(($store) => {
      $store.seclectedPreviewIndex = acitveIndexOrNull;
      return $store;
    });
  };
  const setContaienrWidth = (width: number) => {
    update(($store) => {
      $store.containerWidth = width;
      return $store;
    });
  };

  return {
    subscribe,
    setActivePreview,
    setContaienrWidth,
  };
};

const uiStore = createUiStore();

export default uiStore;
