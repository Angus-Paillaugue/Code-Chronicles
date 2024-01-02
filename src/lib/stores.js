import { writable } from 'svelte/store';

// function storable(key, value) {
//   const isBrowser = typeof window !== 'undefined';
//   const store = writable(
//     isBrowser ? (localStorage[key] ? localStorage[key] : value) : value
//   );
//   const { subscribe, set, update } = store;

//   isBrowser && localStorage[key] && set(JSON.parse(localStorage[key]));

//   return {
//     subscribe,
//     set: (n) => {
//       isBrowser && (localStorage[key] = JSON.stringify(n));
//       set(n);
//     },
//     update: (cb) => {
//       const updatedStore = cb(get(store));

//       isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
//       set(updatedStore);
//     },
//   };
// }

// export const theme = storable("theme", 'light');
export const toasts = writable([]);

/**
 * Creates a new toast notification.
 * @param {Object} obj - The toast object.
 * @param {string} obj.type - The type of the toast (green, red, gray).
 * @param {string} [obj.title] - The title of the toast. If not provided, a default title will be used based on the type.
 * @param {string} obj.message - The message of the toast.
 */
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

/**
 * Removes a toast from the toasts array based on its index.
 * @param {number} index - The index of the toast to be removed.
 */
export function removeToast(index) {
  toasts.update((oldToasts) => {
    oldToasts = oldToasts.filter((el) => el.index !== index);
    return oldToasts;
  });
}
