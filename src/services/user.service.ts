import axios from "axios";
import { BASE_URL_SERVER } from "@/config/const";
import ErrorHandlerService from "./error-handler.service";
import StorageService, {
  COOKIES_ITEMS,
  SECTION_ITEMS,
} from "./storage.service";
import { axiosInstance, bodyResponse } from "../config/axioConfig";

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

export interface UpdateUserRequest {
  bio?: string;
  name?: string;
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

  public async signup(data: AuthDataRequest): Promise<MessageResponse> {
    try {
      await axiosInstance.post("/signup", data);
      return {
        message:
          "You signup successfully. Please check email to active your account.",
      };
    } catch (error: any) {
      const errorMsg: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "You cannot signup. Please contact with admin.",
      });

      throw errorMsg;
    }
  }

  public async login(data: AuthDataRequest): Promise<boolean> {
    try {
      const res = await axiosInstance.post("/login", data);
      const currentUserData = bodyResponse(res).data as LoginedUserData;

      StorageService.setCookies(COOKIES_ITEMS.CURRENT_USER, currentUserData);
      StorageService.setSectionStorageItem(SECTION_ITEMS.IS_AUTH, "true");
      return true;
    } catch (error: any) {
      const errorMsg: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "You cannot login. Please contact with admin.",
      });

      throw errorMsg;
    }
  }

  public async checkAccessToken(): Promise<boolean> {
    const currentUser: LoginedUserData = StorageService.getCookies(
      COOKIES_ITEMS.CURRENT_USER
    );

    if (!currentUser) return false;

    try {
      const accessToken = currentUser.accessToken;
      await axiosInstance.post("/check/token", { accessToken });
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

  public async getUserById(id: string): Promise<InsensitiveUserData> {
    try {
      const res = await axiosInstance.get(`/users/${id}`);
      return bodyResponse(res).data as InsensitiveUserData;
    } catch (error) {
      const errorMsg: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "Cannot get User by Id",
      });
      throw errorMsg;
    }
  }

  public async getCurrentUser(): Promise<InsensitiveUserData> {
    try {
      const currentUserCookies: LoginedUserData = StorageService.getCookies(
        COOKIES_ITEMS.CURRENT_USER
      );

      return await this.getUserById(currentUserCookies._id);
    } catch (error) {
      throw error;
    }
  }

  public async updateUserById(
    id: string,
    data: UpdateUserRequest
  ): Promise<InsensitiveUserData> {
    try {
      const res = await axiosInstance.put(`/users/${id}`, data);
      return bodyResponse(res).data;
    } catch (error) {
      const errorMsg: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "Cannot update current User",
      });
      throw errorMsg;
    }
  }

  public async updateCurrentUser(
    data: UpdateUserRequest
  ): Promise<InsensitiveUserData> {
    try {
      const currentUserCookies: LoginedUserData = StorageService.getCookies(
        COOKIES_ITEMS.CURRENT_USER
      );

      return await this.updateUserById(currentUserCookies._id, data);
    } catch (error) {
      throw error;
    }
  }

  public async updateAvatarCurrentUser(file: File): Promise<string> {
    try {
      const currentUserCookies: LoginedUserData = StorageService.getCookies(
        COOKIES_ITEMS.CURRENT_USER
      );
      const id = currentUserCookies._id;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", id);

      const res = await axiosInstance.post("/users/upload-avatar", formData);
      return bodyResponse(res).data.avatar;
    } catch (error) {
      const errorMsg: MessageResponse = this.getErrorResponeOrDefault(error, {
        message: "Cannot update current User",
      });
      throw errorMsg;
    }
  }
}

export default new UserService();
