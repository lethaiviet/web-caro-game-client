import axios from "axios";
import { BASE_URL_SERVER } from "@/config/const";
import ErrorHandlerService from "./error-handler.service";
import StorageService, {
  COOKIES_ITEMS,
  SECTION_ITEMS,
} from "./storage.service";
import storageService from "./storage.service";

export interface LoginedUserData {
  _id: string;
  accessToken: string;
}

export interface AuthDataRequest {
  email: string;
  password: string;
}

export enum Status {
  error,
  success,
}

export interface AuthDataResponse {
  message: string;
}

class UserService {
  constructor(private ehs = new ErrorHandlerService<AuthDataResponse>()) {}

  async signup(data: AuthDataRequest): Promise<AuthDataResponse> {
    try {
      await axios.post(BASE_URL_SERVER.concat("/signup"), data);
      return {
        message:
          "You signup successfully. Please check email to active your account.",
      };
    } catch (error: any) {
      const defaultRes: AuthDataResponse = {
        message: "You cannot signup. Please contact with admin.",
      };

      const errorRes: AuthDataResponse = this.getErrorResponeOrDefault(
        error,
        defaultRes
      );

      throw errorRes;
    }
  }

  async login(data: AuthDataRequest): Promise<boolean> {
    try {
      const res = await axios.post(BASE_URL_SERVER.concat("/login"), data);
      const cookiesData = res.data?.data as LoginedUserData;
      StorageService.setCookies(COOKIES_ITEMS.CURRENT_USER, cookiesData);
      StorageService.setSectionStorageItem(SECTION_ITEMS.IS_AUTH, "true");

      return true;
    } catch (error: any) {
      const defaultRes: AuthDataResponse = {
        message: "You cannot login. Please contact with admin.",
      };

      const errorRes: AuthDataResponse = this.getErrorResponeOrDefault(
        error,
        defaultRes
      );

      throw errorRes;
    }
  }

  async checkAccessToken(): Promise<boolean> {
    const currentUser: LoginedUserData = StorageService.getCookies(
      COOKIES_ITEMS.CURRENT_USER
    );

    if (!currentUser) return false;

    try {
      const accessToken = currentUser.accessToken;
      await axios.post(BASE_URL_SERVER.concat("/check/token"), { accessToken });

      StorageService.setSectionStorageItem(SECTION_ITEMS.IS_AUTH, "true");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private getErrorResponeOrDefault(
    error: any,
    defaultVal: AuthDataResponse
  ): AuthDataResponse {
    this.ehs.handleErrorMessage(error);

    const errorResponse: AuthDataResponse = this.ehs.errorMsg || defaultVal;
    return errorResponse;
  }
}

export default new UserService();
