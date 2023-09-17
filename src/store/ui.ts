import { writable } from 'svelte/store';

type UIStore = {
  seclectedPreviewIndex: number | null;
};

const createUiStore = () => {
  const { subscribe, update } = writable<UIStore>({
    seclectedPreviewIndex: null,
  });

  const setActivePreview = (acitveIndexOrNull: number | null) => {
    update(($store) => {
      $store.seclectedPreviewIndex = acitveIndexOrNull;
      return $store;
    });
  };

  return {
    subscribe,
    setActivePreview,
  };
};

const uiStore = createUiStore();

export default uiStore;
