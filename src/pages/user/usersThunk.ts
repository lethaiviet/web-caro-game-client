import {
  InsensitiveUserData,
  MessageResponse,
  UpdateUserRequest,
} from "@/services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "@/services/user.service";

const getCurrentUser = createAsyncThunk<
  InsensitiveUserData,
  any,
  { rejectValue: MessageResponse }
>("users/getCurrentUser", async (_, thunkApi) => {
  try {
    return await UserService.getCurrentUser();
  } catch (error) {
    return thunkApi.rejectWithValue(error as MessageResponse);
  }
});

const updateCurrentUser = createAsyncThunk<
  InsensitiveUserData,
  UpdateUserRequest,
  { rejectValue: MessageResponse }
>("users/updateCurrentUser", async (data: UpdateUserRequest, thunkApi) => {
  try {
    return await UserService.updateCurrentUser(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error as MessageResponse);
  }
});

const updateAvatarCurrentUser = createAsyncThunk<
  string,
  File,
  { rejectValue: MessageResponse }
>("users/updateAvatarCurrentUser", async (file: File, thunkApi) => {
  try {
    return await UserService.updateAvatarCurrentUser(file);
  } catch (error) {
    return thunkApi.rejectWithValue(error as MessageResponse);
  }
});

export { getCurrentUser, updateCurrentUser, updateAvatarCurrentUser };
