import { InsensitiveUserData, MessageResponse } from "@/services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "@/services/user.service";

const getCurrentUser = createAsyncThunk<
  InsensitiveUserData,
  any,
  { rejectValue: MessageResponse }
>("auth/signup", async (_, thunkApi) => {
  try {
    return await UserService.getCurrentUser();
  } catch (error) {
    return thunkApi.rejectWithValue(error as MessageResponse);
  }
});

export { getCurrentUser };
