import api from "./index";

export class PaymentApi {
    static async getPayments() {
        const res = await api.get(`payment/`);
        if (!res.status >= 300) {
            throw 'Something went wrong'
        }
        return res.data.reverse()
    }

    static async delete(id) {
        const res = await api.delete(`payment/${id}/`);
        if (!res.status >= 300) {
            throw 'Something went wrong'
        }
        return 'Successfully deleted'
    }

    static async create(data) {
        const res = await api.post(`payment/`, data);
        if (!res.status >= 300) {
            throw 'Something went wrong'
        }
        return 'Successfully added'
    }

    static async update(data) {
        const res = await api.put(`payment/${data.id}/`, data);
        if (!res.status >= 300) {
            throw 'Something went wrong'
        }
        return 'Successfully updated'
    }
}