const BASE_URL = "https://colloquy-api.herokuapp.com";

// Auth
export const signIn = () => `${BASE_URL}/users/sign-in`;
export const signUp = () => `${BASE_URL}/users/sign-up`;

// Discussions

export const getAllDiscussions = () =>
  `${BASE_URL}/discussions/get-discussions`;
export const getCurrentDiscussion = () =>
  `${BASE_URL}/discussions/get-discussion`;
export const getReplies = () => `${BASE_URL}/discussions/get-replies`;

export const createDiscussion = () =>
  `${BASE_URL}/discussions/create-discussion`;
export const addReply = () => `${BASE_URL}/discussions/add-reply`;
