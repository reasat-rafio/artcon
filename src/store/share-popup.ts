import { writable } from 'svelte/store';

type SharePopupStore = {
  show: boolean;
};

const createSharePopupStore = () => {
  const { subscribe, update } = writable<SharePopupStore>({
    show: false,
  });

  const setVisibility = (input: boolean) => {
    update(($store) => {
      $store.show = input;
      return $store;
    });
  };

  return {
    subscribe,
    setVisibility,
  };
};

const sharePopupStore = createSharePopupStore();

export default sharePopupStore;
