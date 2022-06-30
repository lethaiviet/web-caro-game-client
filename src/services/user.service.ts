import axios from "axios";
import { BASE_URL_SERVER } from "@/config/const";
import ErrorHandlerService from "./error-handler.service";
import StorageService, {
  COOKIES_ITEMS,
  SECTION_ITEMS,
} from "./storage.service";

export interface User {
  _id: string;
  email: string;
  password: string;
  status: string;
  accessToken: string;
  bio: string;
  name: string;
  avatar: string;
  avatarLocalPath: string;
  exp: number;
}

export type InsensitiveUserData = Omit<
  User,
  "password" | "avatarLocalPath" | "accessToken"
>;

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

export interface MessageResponse {
  message: string;
}

class UserService {
  constructor(private ehs = new ErrorHandlerService<MessageResponse>()) {}

  async signup(data: AuthDataRequest): Promise<MessageResponse> {
    try {
      await axios.post(BASE_URL_SERVER.concat("/signup"), data);
      return {
        message:
          "You signup successfully. Please check email to active your account.",
      };
    } catch (error: any) {
      const defaultRes: MessageResponse = {
        message: "You cannot signup. Please contact with admin.",
      };

      const errorRes: MessageResponse = this.getErrorResponeOrDefault(
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
      const defaultRes: MessageResponse = {
        message: "You cannot login. Please contact with admin.",
      };

      const errorRes: MessageResponse = this.getErrorResponeOrDefault(
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
    defaultVal: MessageResponse
  ): MessageResponse {
    this.ehs.handleErrorMessage(error);

    const errorResponse: MessageResponse = this.ehs.errorMsg || defaultVal;
    return errorResponse;
  }

  async getUserById(id: string): Promise<InsensitiveUserData> {
    try {
      const userDataRes = await axios.get(`${BASE_URL_SERVER}/users/${id}`);
      return userDataRes.data.data as InsensitiveUserData;
    } catch (error) {
      const errorRes: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "Cannot get User by Id",
      });
      throw errorRes;
    }
  }

  async getCurrentUser(): Promise<InsensitiveUserData> {
    try {
      const currentUserCookies: LoginedUserData = StorageService.getCookies(
        COOKIES_ITEMS.CURRENT_USER
      );

      return await this.getUserById(currentUserCookies._id);
    } catch (error) {
      const errorRes: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "Cannot get current User",
      });
      throw errorRes;
    }
  }
}

export default new UserService();
