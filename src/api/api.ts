import axios from "axios";

export enum ResultCode {
  Success = 0,
  Error = 1,
  Captcha = 10,
}

export type ResponseType<D = {}> = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: D;
};
// TYPES

export const axiosInstance = axios.create({
  headers: {
    "API-KEY": "264a0581-6cdc-4a28-9b7e-b8b5b1060aa0",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
});
