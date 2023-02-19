import { authAxios } from "./index";

export class LandlordApi {
    static getAll() {
        return authAxios.get(`landlord/`);
    }

    static delete(uid) {
        return authAxios.delete(`landlord/${uid}/`);
    }
}
