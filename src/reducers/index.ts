import { combineReducers } from "redux";

import authReducer, { AuthState } from "./authReducer";

export type RootState = {
  auth: AuthState;
};

export default combineReducers({ auth: authReducer });
