import axios from "axios";
import { BASE_URL_SERVER } from "@/config/const";
import ErrorHandlerService from "./error-handler.service";

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

export class UserService {
  static async signup(data: AuthDataRequest): Promise<AuthDataResponse> {
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

  static async login(data: AuthDataRequest): Promise<boolean> {
    try {
      await axios.post(BASE_URL_SERVER.concat("/login"), data);
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

  private static getErrorResponeOrDefault<T>(error: any, defaultVal: T): T {
    const ehs = new ErrorHandlerService<T>();
    ehs.handleErrorMessage(error);

    const errorResponse: T = ehs.errorMsg || defaultVal;
    return errorResponse;
  }
}
