/**
 * Map based storage, used as a fallback if `localStorage` is not available.
 */

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 */
const internalStorageMap = new Map();

/**
 * Map based storage, used as a fallback if `localStorage` is not available.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
const internalStorage = {
  key: () => null,
  getItem: (key) => internalStorageMap.get(key),
  setItem: (key, value) => internalStorageMap.set(key, value),
  removeItem: (key) => internalStorageMap.delete(key),
  clear: () => internalStorageMap.clear(),
  length: 0,
} as Storage;

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */
Object.defineProperty(internalStorage, "length", {
  get: () => internalStorageMap.size,
});

export default internalStorage;
