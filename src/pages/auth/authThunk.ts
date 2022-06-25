import { BASE_URL_SERVER } from "@/config/const";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthData {
  email: string;
  password: string;
}

export interface Message {
  message: string;
}

const signup = createAsyncThunk<Message, AuthData, { rejectValue: Message }>(
  "auth/signup",
  async ({ email, password }: AuthData, thunkApi) => {
    try {
      await axios.post(BASE_URL_SERVER.concat("/signup"), { email, password });
      return {
        message:
          "You signup successfully. Please check email to active your account.",
      };
    } catch (error) {
      const message: Message = axios.isAxiosError(error)
        ? (error.response?.data as Message)
        : { message: "You cannot signup. Please contact with admin." };

      return thunkApi.rejectWithValue(message);
    }
  }
);

export { signup };
