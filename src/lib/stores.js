import { writable } from 'svelte/store';

function storable(key, value) {
  const isBrowser = typeof window !== 'undefined';
  const store = writable(isBrowser ? (localStorage[key] ? localStorage[key] : value) : value);
  const { subscribe, set, update } = store;

  isBrowser && localStorage[key] && set(JSON.parse(localStorage[key]));

  return {
    subscribe,
    set: (n) => {
      isBrowser && (localStorage[key] = JSON.stringify(n));
      set(n);
    },
    update: (cb) => {
      const updatedStore = cb(get(store));

      isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
      set(updatedStore);
    },
  };
}

// export const theme = storable("theme", 'light');
export const toasts = writable([]);

export function newToast(obj) {
  let { type, title, message } = obj;
  const baseToastTitles = {
    green: 'Success',
    red: 'Error',
    gray: 'Info',
  };
  title = title || baseToastTitles[type];
  const newToast = {
    type,
    title,
    message,
    index: 0,
  };
  toasts.update((oldToast) => {
    newToast.index = oldToast.length;
    oldToast = [...oldToast, newToast];
    oldToast = oldToast.sort((a, b) => a.index - b.index);
    return oldToast;
  });

  setTimeout(() => {
    toasts.update((oldToasts) => {
      oldToasts = oldToasts.filter((toast) => toast !== newToast);
      oldToasts = oldToasts.sort((a, b) => a.index - b.index);
      return oldToasts;
    });
  }, 3000);
}

export function removeToast(index) {
  toasts.update((oldToasts) => {
    oldToasts = oldToasts.filter((el) => el.index !== index);
    return oldToasts;
  });
}
