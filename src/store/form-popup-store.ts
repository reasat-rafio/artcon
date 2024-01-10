import { writable } from 'svelte/store';

type FormPopup = {
  show: boolean;
};

function createFormPopupStore() {
  const { subscribe, update } = writable<FormPopup>({
    show: false,
  });

  function setFormPopupVisibility(show: boolean) {
    update(($store) => {
      $store.show = show;
      return $store;
    });
  }

  return {
    subscribe,
    setFormPopupVisibility,
  };
}

const formPopupStore = createFormPopupStore();
export default formPopupStore;
