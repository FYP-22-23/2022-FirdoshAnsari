import { authAxios, axios } from "./index";

export class LandlordApi {
  static getAll() {
    return axios.get(`landlord/`);
  }

  static getTenantsForRoom() {
    return axios.get(`landlord/tenants_for_room/`)
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
    return axios.post('bill/', body)
  }
}
