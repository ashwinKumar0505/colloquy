import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";

export const authentication = (payload: {
  isUserAuthenticated: boolean;
  userName: string;
  token: string;
  userId: string;
}) => ({
  type: AUTHENTICATION,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});
