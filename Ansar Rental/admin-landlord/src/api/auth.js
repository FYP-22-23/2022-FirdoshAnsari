import axios, {authAxios} from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`auth/owner/login/`, data);
  };

  static Register = (data) => {
    return authAxios.post(`auth/signup/`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

let base = "users";

export default AuthApi;
