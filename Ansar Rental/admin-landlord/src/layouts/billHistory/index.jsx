import {useMutation} from "react-query";
import {BillApi} from "../../api/bill";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {toast} from "react-toastify";
import bgImage from '../../assets/images/payment.jpg';
import {useApi} from "../../api-context/api.context";


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 15, type: "number", align: "center"},
    {field: 'room_number', headerName: 'Room no.', width: 75, type: "number", align: "center", editable: true},
    {field: 'month', headerName: 'Month', width: 75, align: "center", editable: true},
    {field: 'due_amount', headerName: 'Due amount', width: 100, type: "number", align: "center", editable: true},
    {
        field: 'previous_electricity_unit',
        headerName: 'Previous Electricity Unit',
        width: 150,
        type: "number",
        align: "center",
        editable: true
    },
    {
        field: 'present_electricity_unit',
        headerName: 'Present Electricity Unit',
        width: 150,
        type: "number",
        align: "center",
        editable: true
    },
    {
        field: 'electricity_rate',
        headerName: "Electricity Rate",
        width: 100,
        type: "number",
        align: "center",
        editable: true
    },
    {field: 'discount', headerName: "Discount", width: 80, type: "number", align: "center", editable: true},
    {
        field: 'water_and_waste',
        headerName: "Water & Waste",
        width: 110,
        type: "number",
        align: "center",
        editable: true
    },
    {
        field: 'monthly_room_rent',
        headerName: "Monthly room rent",
        width: 150,
        type: "number",
        align: "center",
        editable: true
    },
    {field: 'total', headerName: "Total", width: 110, type: "number", align: "center"},
    {field: 'remarks', headerName: "Remarks", width: 110, align: "center"},
];

const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
};

export const BillHistory = () => {
    const {billHistory} = useApi()

    const updateMutation = useMutation((data) => BillApi.update(data),
        {
            onSuccess: data => {
                toast(data, {type: "success"})
                // query.refetch()
            },
            onError: error => toast(error, {type: "error"})
        }
    )

    return (
        <div style={styles}>
            <div style={{height: 620, width: '79%', marginLeft: '20%', marginTop: 24, color: 'blue'}}>
                Bill History
                <DataGrid style={{marginTop: '10px', color: 'white', fontSize: 10}}
                          rows={billHistory}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          processRowUpdate={(newRow, oldRow) => {
                              if (oldRow === newRow) return
                              updateMutation.mutate(newRow);
                          }}
                />
            </div>
        </div>
    )
}