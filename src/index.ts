/**
 * Expirable data storage based on `localStorage` and `sessionStorage`.
 *
 * TODO: Add data compression.
 * https://www.npmjs.com/package/lzw-compressor
 *
 * TODO: Store keys and TTL in a different storage to avoid unnecessary
 *   `JSON.parse` operations.
 */
import { ExpirableStorage, ExpirableStorageOptions } from "../index";
import internalStorage from "./internal-storage";

/**
 * A global key to store `intervalId` returned by the `setInterval` method.
 * Used as a flag to initialize automatic flushing only once.
 */
const AUTO_FLUSH_KEY = "__REACT_EXPIRABLE_STORAGE__";

/**
 * A key prefix to easily find all keys with expirable values in the storage.
 */
const KEY_PREFIX = "EXPIRABLE_";

const root = typeof window !== "undefined" ? window : global;
const isSupported = Object.prototype.hasOwnProperty.call(root, "localStorage");
const localStorage = isSupported ? root.localStorage : internalStorage;
const sessionStorage = isSupported ? root.sessionStorage : internalStorage;

/**
 * Creates an instance of expirable data storage.
 * @param options.autoFlushInterval An interval in seconds to flush expired
 *     values. Default 900 (15 minutes).
 * @param options.storage n instance of Storage class. Default `localStorage`.
 * @return An instance of expirable data storage.
 */
export const createExpirableStorage = ({
  autoFlushInterval = 900,
  storage,
}: ExpirableStorageOptions) => {
  const setItem = (key: string, value: unknown, ttl: number) => {
    const data = { value: value, ttl: Date.now() + ttl * 1000 };
    try {
      storage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(data));
    } catch (ex) {
      // Throws a `TypeError` exception when a circular reference is found.
      // Throws a `TypeError` exception when trying to stringify a BigInt value.
      // Throws a `QuotaExceededError` exception if the storage is full.
      return false;
    }
    return true;
  };

  if (
    autoFlushInterval &&
    !Object.prototype.hasOwnProperty.call(root, AUTO_FLUSH_KEY)
  ) {
    root[AUTO_FLUSH_KEY] = setInterval(flush, autoFlushInterval * 1000);
    flush();
  }

  return {
    clear: () => forEachExpirable(storage, (key) => storage.removeItem(key)),
    flush: () => forEachExpirable(storage, (key) => clearExpired(storage, key)),
    removeItem: (key: string) => storage.removeItem(`${KEY_PREFIX}${key}`),
    getItem: (key: string) => getUnexpired(storage, `${KEY_PREFIX}${key}`),
    setItem,
  } as ExpirableStorage;
};

/**
 * @param storage A storage object.
 * @param fn A function to be called for each key in a storage object.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
 * @private
 */
const forEachExpirable = (storage: Storage, fn: (key: string) => void) => {
  for (let i = storage.length - 1; i >= 0; --i) {
    const key = storage.key(i);
    key?.startsWith(KEY_PREFIX) && fn(key);
  }
};

/**
 * Gets a value stored under a key in storage if it exists and is not expired.
 * @param storage A storage object.
 * @param key A key to identify the value.
 * @return A corresponding value associated with the key if it exists and is
 *     not expired, `null` otherwise.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * @private
 */
const getUnexpired = (storage: Storage, key: string) => {
  const value = storage.getItem(key);

  if (null !== value) {
    try {
      const data = JSON.parse(value);
      if (Date.now() > data.ttl) {
        // Remove the value if it is expired.
        storage.removeItem(key);
      } else {
        // Return the value if it is not expired.
        return data.value;
      }
    } catch (ex) {
      // Throws a `SyntaxError` if the string to parse is not valid JSON.
      storage.removeItem(key);
    }
  }

  return null;
};

const clearExpired = (storage: Storage, key: string) =>
  getUnexpired(storage, key) !== null;

/**
 * Flushes all expired items without affecting the rest of the storage.
 * @private
 */
const flush = () => {
  forEachExpirable(localStorage, (key) => clearExpired(localStorage, key));
  forEachExpirable(sessionStorage, (key) => clearExpired(sessionStorage, key));
};

export const expirableLocalStorage = createExpirableStorage({
  storage: localStorage,
});

export const expirableSessionStorage = createExpirableStorage({
  storage: sessionStorage,
});
