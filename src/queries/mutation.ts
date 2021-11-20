import { useMutation } from "react-query";
import axios from "../utils/customAxios";
import {
  addReply,
  createDiscussion,
  signIn,
  signUp,
} from "../constants/queryUrls";

export const useSignIn = (
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
) => {
  return useMutation(
    (payload: { email: string; password: string }) =>
      axios.post(signIn(), payload).then((res) => res.data),
    {
      onSuccess,
      onError,
    }
  );
};

export const useSignUp = (
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
) => {
  return useMutation(
    (payload: { email: string; password: string; name: string }) =>
      axios.post(signUp(), payload).then((res) => res.data),
    {
      onSuccess,
      onError,
    }
  );
};

export const useCreateDiscussion = (
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
) => {
  return useMutation(
    (payload: {
      creatorName: string;
      title: string;
      description: string;
      userId: string;
    }) => axios.post(createDiscussion(), payload).then((res) => res.data),
    {
      onSuccess,
      onError,
    }
  );
};

export const useAddReply = (
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
) => {
  return useMutation(
    (payload: { discussionId: string; personName: string; reply: string }) =>
      axios.post(addReply(), payload).then((res) => res.data),
    {
      onSuccess,
      onError,
    }
  );
};
