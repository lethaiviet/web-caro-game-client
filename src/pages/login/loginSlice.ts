import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '@storeRedux';

export interface LoginState {
    username: string;
    password: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: LoginState = {
    username: "",
    password: "",
    status: 'idle',
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        }
    },
});

export const { setUsername, setPassword } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;