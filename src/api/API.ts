import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "API-KEY": "264a0581-6cdc-4a28-9b7e-b8b5b1060aa0",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
}); // axios.create({REQUEST CONFIG}) accepts JSON config object as its input and returns axios instance ( with config set to {REQUEST CONFIG} )

export const usersAPI = {
  getUsers(currentPageNumber: number = 1, pageSize: number = 100) {
    return axiosInstance
      .get(`users?page=${currentPageNumber}&count=${pageSize}`)
      .then((promise) => promise.data);
  }, // getUsersAPI() returns promise.data
};
