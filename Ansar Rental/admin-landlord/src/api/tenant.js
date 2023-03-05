import { axios } from "./index";

export class TenantApi {
  static getAll() {
    return axios.get(`tenant/`);
  }

  static update(id, body) {
    return axios.put(`tenant/${id}/`, body)
  }

  static delete(uid) {
    return axios.delete(`tenant/${uid}/`);
  }
}
