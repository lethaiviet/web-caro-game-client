import {
  AuthDataRequest,
  AuthDataResponse,
  UserService,
} from "@/services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const signup = createAsyncThunk<
  AuthDataResponse,
  AuthDataRequest,
  { rejectValue: AuthDataResponse }
>("auth/signup", async (data: AuthDataRequest, thunkApi) => {
  try {
    return await UserService.signup(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error as AuthDataResponse);
  }
});

const login = createAsyncThunk<
  boolean,
  AuthDataRequest,
  { rejectValue: AuthDataResponse }
>("auth/login", async (data: AuthDataRequest, thunkApi) => {
  try {
    return await UserService.login(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error as AuthDataResponse);
  }
});

export { signup, login };
