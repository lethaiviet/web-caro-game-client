import UserService, {
  AuthDataRequest,
  MessageResponse,
} from "@/services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

const signup = createAsyncThunk<
  MessageResponse,
  AuthDataRequest,
  { rejectValue: MessageResponse }
>("auth/signup", async (data: AuthDataRequest, thunkApi) => {
  try {
    return await UserService.signup(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error as MessageResponse);
  }
});

const login = createAsyncThunk<
  boolean,
  AuthDataRequest,
  { rejectValue: MessageResponse }
>("auth/login", async (data: AuthDataRequest, thunkApi) => {
  try {
    return await UserService.login(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error as MessageResponse);
  }
});

const checkAccessToken = createAsyncThunk<boolean>(
  "auth/check-access-token",
  async () => {
    return await UserService.checkAccessToken();
  }
);

export { signup, login, checkAccessToken };
