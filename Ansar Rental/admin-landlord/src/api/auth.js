import axios, { authAxios } from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`auth/owner/login/`, data);
  };

  static Register = async (data) => {
    const res = await authAxios.post(`auth/signup/`, data);
    console.log(res.data)
    if(res.status>=300) throw res.data
    return res.data
  };

  static Logout = (data) => {
    return axios.post(`auth/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

export default AuthApi;
