// Soft UI Dashboard React components
// Soft UI Dashboard React example components
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React from "react";
import {Stack} from "@mui/material";
import Chart from 'react-apexcharts'
import bgImage from '../../assets/images/wc.jpeg';
import {useApi} from "../../api-context/api.context";


function CalendarWidget() {
    return (
        <iframe
            src="https://www.hamropatro.com/widgets/calender-small.php"
            style={{border: 10, overflow: 'hidden', width: '300px', height: '290px', marginLeft: '50px'}}
        />
    );
}

const paymentCols: GridColDef[] = [
    {field: 'room_number', headerName: 'Room No.', width: 90, type: "number"},
    {field: 'paid_amount', headerName: 'Paid amount', width: 130, type: "number"},
    {field: 'due_amount', headerName: 'Due amount', width: 130, type: "number"},
    {field: 'month', headerName: 'Month', width: 90},
    {field: 'created_at', headerName: "Paid on", width: 160},
    {field: 'remarks', headerName: "Remarks", width: 130},
];

const styles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
};

const billCols: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 10, type: "number", align: "center"},
    {field: 'room_number', headerName: 'Room no.', width: 65, type: "number", align: "center"},
    {field: 'month', headerName: 'Month', width: 80, align: "center", editable: true},
    {field: 'due_amount', headerName: 'Due amount', width: 70, type: "number", align: "center"},
    {
        field: 'previous_electricity_unit',
        headerName: 'Prev. Elect. Unit',
        width: 85,
        type: "number",
        align: "center",
        editable: true
    },
    {
        field: 'present_electricity_unit',
        headerName: 'Pres. Elect. Unit',
        width: 85,
        type: "number",
        align: "center"
    },
    {
        field: 'electricity_rate',
        headerName: "Electricity Rate",
        width: 79,
        type: "number",
        align: "center"
    },
    {field: 'discount', headerName: "Discount", width: 55, type: "number", align: "center"},
    {field: 'water_and_waste', headerName: "Water/Waste", width: 70, type: "number", align: "center"},
    {
        field: 'monthly_room_rent',
        headerName: "Monthly room rent",
        width: 105,
        type: "number",
        align: "center"
    },
    {field: 'total', headerName: "Total", width: 40, type: "number", align: "center"},
];

function Dashboard() {
    const {bills, payments, tenantsForRoom, billHistory} = useApi()

    let totalTenants = 0
    for(let i=0;i<tenantsForRoom.length;i++){
        const t = tenantsForRoom[i]
        totalTenants+=t.tenants
    }

    function getShortPayment() {
        let arr = []
        for (let i = 0; i < payments.length; i++) {
            if (i === 5) break
            arr.push(payments[i])
        }
        return arr
    }

    function getShortBills() {
        let arr = []
        for (let i = 0; i < bills.length; i++) {
            if (i === 5) break;
            arr.push(bills[i])
        }
        return arr
    }

    function getShortBillHistory() {
        let arr = []
        for (let i = 0; i < billHistory.length; i++) {
            if (i === 5) break;
            arr.push(billHistory[i])
        }
        return arr
    }

    return (
        <div style={styles}>
            <Stack direction='row' sx={{marginTop: 0}}>
                <div style={{
                    height: 300,
                    width: '55%',
                    marginLeft: '20%',
                    marginTop: 14,
                    marginBottom: 38,
                    color: 'blue',
                    fontSize: 18
                }}>
                    {getShortBills().length === 0 ? 'Bill History' : 'Bills'}
                    <DataGrid style={{marginTop: '5px', fontSize: 12}}
                              componentsProps={{
                                  pagination: {
                                      hidden: true,
                                  }
                              }}
                              rows={getShortBills().length === 0 ? getShortBillHistory() : getShortBills()}
                              columns={billCols}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              rowSelection={false}
                    />
                </div>
                <Stack alignItems='center'>
                    <div style={{color: 'blue', fontSize: 15, marginTop: 20}}>Nepali Calender</div>
                    <CalendarWidget/>
                </Stack>
            </Stack>
            <Stack direction='row' sx={{marginTop: 0}}>
                <div style={{height: 300, width: '40%', marginLeft: '20%', marginTop: 6, color: 'blue', fontSize: 18}}>
                    Recent Payments
                    <DataGrid style={{marginTop: '5px', fontSize: 12}}
                              rows={getShortPayment()}
                              columns={paymentCols}
                              rowSelection={false}
                    />
                </div>
                <Stack alignItems='center'>
                    <div style={{color: 'blue', fontSize: 15}}>Room numbers and tenants</div>
                    <Chart options={{
                        chart: {
                            id: 'apexchart-hh',
                        },
                        xaxis: {
                            categories: tenantsForRoom.map((r) => r.room_number)
                        }
                    }} series={[{
                        name: 'series-1',
                        data: tenantsForRoom.map((r) => r.tenants),
                    }]} type="bar" width={500} height={300}/>
                    <h4 style={{color: 'green', fontSize: 16, marginTop: -17}}>
                        {`No. of tenants: ${totalTenants}`}
                    </h4>
                </Stack>
            </Stack>
        </div>
    );
}

export default Dashboard;
