export type ExpirableStorage = {
  getItem: (key: string) => unknown | null;
  setItem: (key: string, value: unknown, ttl: number) => boolean;
  removeItem: (key: string) => void;
  clear: () => void;
  flush: () => void;
};

export type ExpirableStorageOptions = {
  autoFlushInterval?: number;
  storage: Storage;
};

export const expirableLocalStorage: ExpirableStorage;
export const expirableSessionStorage: ExpirableStorage;

/**
 * Creates an instance of expirable data storage.
 * @param options.autoFlushInterval An interval in seconds to flush expired
 *     values. Default 900 (15 minutes).
 * @param options.storage n instance of Storage class. Default `localStorage`.
 * @return An instance of expirable data storage.
 */
export function createExpirableStorage({
  autoFlushInterval: number,
  storage: Storage,
}: ExpirableStorageOptions): ExpirableStorage;
