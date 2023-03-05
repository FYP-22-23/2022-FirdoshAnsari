import Axios from "axios";
import storage from '@react-native-async-storage/async-storage'
// import eSewaPaymentSDK, { eSewaOptions } from 'rn-esewa';

const baseUrl = 'http://192.168.254.10:8000'

const api = Axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
});

const authApi = Axios.create({
    baseURL: baseUrl,
});

authApi.interceptors.request.use(
    async (config) => {
        const user = await storage.getItem('user')
        const accessToken = JSON.parse(user).token
        if (accessToken) {
          config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
)

export async function login(username, password) {
    const res = await api.post('/auth/tenant/login/', {username, password})
    if('error' in res.data) {
        throw res.data.error
    }
    if(!res.data.success){
        throw 'Something went wrong'
    }
    return res.data
}

export async function setFcmToken(id, token) {
    const res = await authApi.put(`/tenant/${id}/`,{fcm_token: token});
    if('error' in res.data) {
        throw res.data.error
    }
    if(!res.data.success) {
        throw 'Something went wrong'
    }
    return res.data
}

// export async function makePayment(){
//     const options = {
//         isDevelopment: true,
//         clientId: 'JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R',
//         clientSecret: 'BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ==',
//         productId: new Date().getTime().toString(),
//         productName: 'Payment for RN-Esewa Module',
//         productPrice: '1',
//     };
//     eSewaPaymentSDK.initiatePayment(options, paymentCallback);
//     // Esewa.makePayment(100,'productName','productID');
// }

const paymentCallback = (response) => {
    const { completed, proofOfPayment, didCancel, errorMessage } = response;

    if (completed) {
      console.debug('ProofOfPayment', proofOfPayment);
    } else if (didCancel) {
      console.info('Payment is canceled by user');
    } else {
      console.error(
        `Could not complete the payment due to ${
          errorMessage || 'an unknown error'
        }`
      );
    }
  };