import axios from "axios";
import { getAccessToken } from "./token";

const Axios = axios.create({});
Axios.interceptors.request.use((req: any) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export default Axios;
