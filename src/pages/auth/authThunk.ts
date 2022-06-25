import { BASE_URL_SERVER } from "@/config/const";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthData {
  email: string;
  password: string;
}

const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: AuthData, thunkApi) => {
    try {
      const res = await axios.post(BASE_URL_SERVER.concat("/signup"), {
        email,
        password,
      });

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data);
      } else {
        return thunkApi.rejectWithValue(error);
      }
    }
  }
);

export { signup };
