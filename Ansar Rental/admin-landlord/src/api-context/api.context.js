import React from "react";
import PropTypes from "prop-types";
import {useQueries} from "react-query";
import {BillApi} from "../api/bill";
import {PaymentApi} from "../api/payment";
import {LandlordApi} from "../api/landlord";

const ApiContext = React.createContext(null);

export const ApiProvider = ({children}) => {
    const [bills, setBills] = React.useState()
    const [payments, setPayments] = React.useState()
    const [billHistory, setBillHistory] = React.useState()
    const [tenantsForRoom, setTenantsForRoom] = React.useState()

    useQueries([
        {
            queryKey: ['bill-history'],
            queryFn: () => BillApi.getAllBills(),
            staleTime: Infinity,
            onSuccess: data => setBillHistory(data)
        },
        {
            queryKey: ['payments'],
            queryFn: () => PaymentApi.getPayments(),
            staleTime: Infinity,
            onSuccess: data => setPayments(data)
        },
        {
            queryKey: ['bills'],
            queryFn: () => BillApi.getPendingBills(),
            staleTime: Infinity,
            onSuccess: data => setBills(data)
        },
        {
            queryKey: ['tenantsforroom'],
            queryFn: () => LandlordApi.getTenantsForRoom(),
            staleTime: Infinity,
            onSuccess: data => setTenantsForRoom(data.data)
        },
    ])

    if (!(bills && payments && billHistory && tenantsForRoom)) return null

    return <ApiContext.Provider
        value={{bills, payments, billHistory, tenantsForRoom}}
    >
        {children}
    </ApiContext.Provider>;
};

ApiProvider.propTypes = {
    children: PropTypes.any,
};

export const useApi = () => React.useContext(ApiContext);
