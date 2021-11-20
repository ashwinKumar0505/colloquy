import { RootState } from "../reducers";

export const getUserName = (state: RootState) => state.auth.userName;
export const getIsUserAuthenticated = (state: RootState) =>
  state.auth.isUserAuthenticated;
export const getUserId = (state: RootState) => state.auth.userId;
