const ACCESS_TOKEN = "accessToken";

export const getAccessToken = () => window.localStorage.getItem(ACCESS_TOKEN);

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};
