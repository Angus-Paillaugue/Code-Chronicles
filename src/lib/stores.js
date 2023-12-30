import { writable } from 'svelte/store';

export const toasts = writable([]);

export function newToast(obj) {
    let { type, title, message } = obj;
    const baseToastTitles = {
        green: 'Success',
        red: 'Error',
        gray: 'Info'
    };
    title = title || baseToastTitles[type];
    const newToast = { type, title, message, index:0 };
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