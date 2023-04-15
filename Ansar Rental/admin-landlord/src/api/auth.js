import axios, {authAxios} from "./index";

class AuthApi {
    static ChangePassword = async (data) => {
        const res = await authAxios.post(`auth/owner/change-password/`, data)
        if(res.status>299) throw res.data.error
        return res.data.success
    }
    static Login = (data) => {
        return axios.post(`auth/owner/login/`, data);
    };

    static Register = async (data) => {
        const res = await authAxios.post(`auth/signup/`, data);
        if (res.status >= 300) throw res.data
        return res.data
    };

    static sendPasswordResetEmail = async (email) => {
        const res = await axios.post(`auth/send-reset-link/`, {email})
        if (res.status >= 300) throw 'Couldn\'t send mail'
        return 'Successfully emailed'
    }

    static Logout = (data) => {
        return axios.post(`auth/logout`, data, {headers: {Authorization: `${data.token}`}});
    };
}

export default AuthApi;
