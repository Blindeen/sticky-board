const setLocalStorageItem = (key: string, value: string) =>
    localStorage.setItem(key, value);

const getLocalStorageItem = (key: string) => localStorage.getItem(key);

export { setLocalStorageItem, getLocalStorageItem };
