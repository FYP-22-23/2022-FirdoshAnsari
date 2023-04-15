import api from "./index";

export class BillApi {
    static async getPendingBills() {
        const res = await api.get(`bill/get_all_pending_bills/`);
        if (res.status >= 300) {
            throw 'Something went wrong'
        }
        return res.data
    }

    static async getAllBills() {
        const res = await api.get(`bill/`);
        if (res.status >= 300) {
            throw 'Something went wrong'
        }
        return res.data
    }

    static async update(data) {
        const res = await api.put(`bill/${data.id}/`, data);
        if (res.status >= 300) {
            throw 'Something went wrong'
        }
        return 'Successfully updated'
    }
}