import Axios from "axios";
import storage from '@react-native-async-storage/async-storage'
import KhaltiSdk from "react-native-khalti-sdk";
// import eSewaPaymentSDK, { eSewaOptions } from 'rn-esewa';

const baseUrl = 'http://192.168.254.10:8000'

const api = Axios.create({
    baseURL: baseUrl,
    headers: {"Content-Type": "application/json"},
    validateStatus: (status) => true
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
    try {
        const res = await api.post('/auth/tenant/login/', {username, password})
        if (res.status > 299) {
            throw ''
        }
        return res.data
    } catch (_) {
        throw 'Incorrect username or password'
    }
}

export async function changePassword(old_password, new_password, confirm_password) {
    const res = await authApi.post(`/auth/tenant/change-password/`, {old_password, new_password, confirm_password})
    if (res.status > 299) throw res.data.error
    return res.data.success
}

export async function setFcmToken(id, token) {
    const res = await authApi.patch(`/tenant/${id}/`, {fcm_token: token});
    if ('error' in res.data) {
        throw res.data.error
    }
    if (!res.data.success) {
        throw 'Something went wrong'
    }
    return res.data
}

export async function payWithKhalti() {
    try {
        return KhaltiSdk.startKhaltiSdk(
            'test_public_key_dc74e0fd57cb46cd93832aee0a390234',
            'monthly fee',
            '01',
            '',
            1,
        );
        return result
    } catch (e) {
        console.log({e});
        throw 'Something went wrong'
    }
}

export async function getPayments(roomNo) {
    const res = await api.post(`payment/for_room/`, {room_number: roomNo});
    if (!res.status >= 300) {
        throw 'Something went wrong'
    }
    return res.data
}

export function intToMonth(month) {
    if (month < 1 || month > 12) return ''
    if (month == 1) {
        return 'BAISAKH'
    }
    if (month == 2) {
        return 'JESTHA'
    }
    if (month == 3) {
        return 'ASHAR'
    }
    if (month == 4) {
        return 'SHRAWAN'
    }
    if (month == 5) {
        return 'BHADRA'
    }
    if (month == 6) {
        return 'ASHWIN'
    }
    if (month == 7) {
        return 'KARTIK'
    }
    if (month == 8) {
        return 'MANGSHIR'
    }
    if (month == 9) {
        return 'POUSH'
    }
    if (month == 10) {
        return 'MAGH'
    }
    if (month == 11) {
        return 'FALGUN'
    }
    if (month == 12) {
        return 'CHAITRA'
    }
}

export async function createPayment(paid_amount, due_amount, room_number, remarks, bill, month) {
    const res = await api.post(`payment/`,
        {
            paid_amount: paid_amount,
            due_amount: due_amount,
            month: month,
            room_number: room_number,
            remarks: remarks,
            bill: bill,
        });
    if (!res.status >= 300) {
        throw 'Something went wrong'
    }
    return res.data
}

export async function getPendingBills(roomNo) {
    const res = await api.post(`bill/get_pending_bills/`, {room_number: roomNo});
    if (!res.status >= 300) {
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

// const paymentCallback = (response) => {
//     const { completed, proofOfPayment, didCancel, errorMessage } = response;

//     if (completed) {
//       console.debug('ProofOfPayment', proofOfPayment);
//     } else if (didCancel) {
//       console.info('Payment is canceled by user');
//     } else {
//       console.error(
//         `Could not complete the payment due to ${
//           errorMessage || 'an unknown error'
//         }`
//       );
//     }
//   };
