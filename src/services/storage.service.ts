import Cookies from "universal-cookie/es6";
export enum COOKIES_ITEMS {
  CURRENT_USER = "currentUser",
}

class StorageService {
  constructor(private cookies = new Cookies()) {}

  setCookies(key: COOKIES_ITEMS, value: any) {
    this.cookies.set(key, JSON.stringify(value));
  }

  getCookies(key: COOKIES_ITEMS) {
    return this.cookies.get(key);
  }
}

export default new StorageService();
