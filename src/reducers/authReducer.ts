import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";
import { setAccessToken } from "../utils/token";

export type AuthState = {
  isUserAuthenticated: boolean;
  userName: string;
  userId: string;
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: AuthState = {
  isUserAuthenticated: false,
  userName: "",
  userId: "",
};

const AuthReducer = (state: AuthState = initialState, action: TAction) => {
  switch (action.type) {
    case AUTHENTICATION: {
      const { userName, isUserAuthenticated, token, userId } = action.payload;
      setAccessToken(token);
      return {
        ...state,
        isUserAuthenticated,
        userName,
        userId,
      };
    }
    case LOGOUT: {
      localStorage.clear();
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
