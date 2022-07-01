import Cookies from "universal-cookie/es6";
export enum COOKIES_ITEMS {
  CURRENT_USER = "currentUser",
  AUTHORIZATION = "Authorization",
}

export enum SECTION_ITEMS {
  IS_AUTH = "isAuth",
}

class StorageService {
  constructor(private cookies = new Cookies()) {}

  public setCookies(key: COOKIES_ITEMS, value: any) {
    this.cookies.set(key, JSON.stringify(value));
  }

  public getCookies(key: COOKIES_ITEMS) {
    return this.cookies.get(key);
  }

  public setSectionStorageItem(key: SECTION_ITEMS, value: string) {
    window.sessionStorage.setItem(key, value);
  }

  public deleteSessionStorageItem(key: COOKIES_ITEMS) {
    window.sessionStorage.removeItem(key);
  }

  public deleteAddSessionStorageItem() {
    window.sessionStorage.clear();
  }

  public getSectionStorageItem(key: SECTION_ITEMS) {
    return window.sessionStorage.getItem(key);
  }

  public deleteLocalStorageItem(key: SECTION_ITEMS) {
    window.localStorage.removeItem(key);
  }

  public deleteAllLocalStorageItem() {
    window.localStorage.clear();
  }
}

export default new StorageService();
