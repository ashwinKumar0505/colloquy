import { useQuery } from "react-query";
import axios from "../utils/customAxios";
import {
  getAllDiscussions,
  getCurrentDiscussion,
  getReplies,
} from "../constants/queryUrls";

export const useGetAllDiscussions = () => {
  return useQuery("all-discussions", () =>
    axios.get(getAllDiscussions()).then((res) => res.data)
  );
};

export const useGetDiscussionBy = (discussionId: string) => {
  return useQuery("discussion", () =>
    axios
      .get(getCurrentDiscussion(), { params: discussionId })
      .then((res) => res.data)
  );
};

export const useGetReplies = (discussionId: string) => {
  return useQuery("replies", () =>
    axios
      .get(getReplies(), { params: { discussionId } })
      .then((res) => res.data)
  );
};
