import axios, { authAxios } from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`auth/owner/login/`, data);
  };

  static Register = (data) => {
    return authAxios.post(`auth/signup/`, data);
  };

  static Logout = (data) => {
    return axios.post(`auth/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

export default AuthApi;
