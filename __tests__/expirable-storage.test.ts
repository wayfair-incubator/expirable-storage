import { expirableLocalStorage, expirableSessionStorage } from "../src/index";

describe("ExpirableStorage", () => {
  it("expirableLocalStorage: should set item with expiration", () => {
    const value = "value";
    expirableLocalStorage.setItem("test", value, 1000);
    expect(expirableLocalStorage.getItem("test")).toBe(value);
  });

  it("expirableSessionStorage: should set item with expiration", () => {
    const value = "value";
    expirableSessionStorage.setItem("test", value, 1000);
    expect(expirableSessionStorage.getItem("test")).toBe(value);
  });
});
