const clickOutSide = (node: HTMLElement, callbackFunction: () => void) => {
  function onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement && !node.contains(event.target))
      callbackFunction();
  }

  document.body.addEventListener('click', onClick);
  return {
    update(newCallbackFunction: () => void) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    },
  };
};

export default clickOutSide;
