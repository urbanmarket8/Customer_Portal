import request from "../axios";
import { FORGET_PASSWORD_URL, LOGIN_URL, RESET_PASSWORD_URL, SIGN_UP_URL } from "../url";

export const signUpApi = async (payload) => {
  return request.post(SIGN_UP_URL, { data: { attributes: { ...payload } } });
};

export const loginApi = async (payload) => {
  return request.post(LOGIN_URL, { data: { attributes: { ...payload } } });
};

export const ForgetPaswordApi = async (email) => {
  return request.post(FORGET_PASSWORD_URL,
    email
  );
};


export const resetPaswordApi = async (email) => {
  return request.post(RESET_PASSWORD_URL,
    email,
  );
};