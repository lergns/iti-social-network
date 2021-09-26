import { axiosInstance, ResponseType } from "./api";

type GetMeDataType = {
  id: number;
  email: string;
  login: string;
};
// TYPES

export const authAPI = {
  me() {
    return axiosInstance
      .get<ResponseType<GetMeDataType>>(`auth/me`)
      .then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
  ) {
    return axiosInstance
      .post<ResponseType<{ userId?: number }>>(`/auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return axiosInstance
      .delete<ResponseType>(`/auth/login`)
      .then((res) => res.data);
  },
};
