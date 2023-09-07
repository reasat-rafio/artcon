import { writable } from 'svelte/store';

type UIStore = {
  seclectedPreviewIndex: number | null;
};

const createUiStore = () => {
  const { subscribe, update } = writable<UIStore>({
    seclectedPreviewIndex: null,
  });

  const setActivePreview = (acitveIndex: number) => {
    update(($store) => {
      $store.seclectedPreviewIndex = acitveIndex;
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
