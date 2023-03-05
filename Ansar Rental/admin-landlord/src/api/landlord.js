import { authAxios, axios } from "./index";

export class LandlordApi {
  static getAll() {
    return authAxios.get(`landlord/`);
  }

  static update(id, body) {
    return authAxios.put(`landlord/${id}/`, body)
  }

  static delete(uid) {
    return authAxios.delete(`landlord/${uid}/`);
  }

  static getRoomNumbers() {
    return axios.get(`landlord/roomNumbers`)
  }

  static generateBill(body) {
    console.log(body)
    return axios.post('bill/', body)
  }
}
