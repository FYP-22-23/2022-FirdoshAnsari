import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import {GridActionsCellItem,} from '@mui/x-data-grid-pro';
import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import {LandlordApi} from "../../api/landlord";
import {PaymentApi} from "../../api/payment";
import {toast} from "react-toastify";
import SuiButton from "../../components/SuiButton";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {DeleteOutline} from "@mui/icons-material";
import bgImage from '../../assets/images/payment.jpg';
import {useApi} from "../../api-context/api.context";

export const Payment = () => {
    const {payments, bills} = useApi()
    const deleteMutation = useMutation((id) => PaymentApi.delete(id),
        {
            onSuccess: () => {
                setIdToDelete(null)
                window.location.reload()
                // query.refetch()
            },
            onError: (error) => toast(error, {type: "error"})
        }
    )

    const [idToDelete, setIdToDelete] = useState(null)

    const styles = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
    };

    const columns: GridColDef[] = [
        // {field: 'billId', headerName: 'Bill Id', width: 90},
        {field: 'room_number', headerName: 'Room No.', width: 100, type: "number", editable: true},
        {field: 'paid_amount', headerName: 'Paid amount', width: 130, type: "number", editable: true},
        {field: 'due_amount', headerName: 'Due amount', width: 100, type: "number", editable: true, align: 'center'},
        {field: 'discount', headerName: 'Discount', width: 100, type: "number", editable: true},
        {field: 'month', headerName: 'Month', width: 130, editable: true},
        {field: 'created_at', headerName: "Paid on", width: 160},
        {field: 'remarks', headerName: "Remarks", width: 350, editable: true},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 80,
            cellClassName: 'actions',
            getActions: ({id}) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteOutline/>}
                        label="Delete"
                        key='edit-payment'
                        onClick={() => {
                            setIdToDelete(id)
                        }}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const [roomNumber, setRoomNumber] = useState(null)
    const [billId, setBillId] = useState(null)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [month, setMonth] = useState('BAISAKH')

    const roomNumberQuery = useQuery('room_numbers', () => LandlordApi.getRoomNumbers(), {
        onSuccess: (d) => setRoomNumber(d.data[0])
    })

    const addPaymentMutation = useMutation(
        (data) => PaymentApi.create(data),
        {
            onSuccess: data => {
                toast(data.toString(), {type: "success"})
                setShowAddDialog(false)
                window.location.reload()
                // query.refetch()
            },
            onError: error => toast(error.toString(), {type: "error"}),
        }
    )

    const updatePaymentMutation = useMutation((data) => PaymentApi.update(data),
        {
            onSuccess: data => {
                toast(data.toString(), {type: "success"})
            },
            onError: error => toast(error.toString(), {type: "error"}),
        }
    )

    if (!roomNumberQuery.isSuccess)
        return null

    function onAdd(form) {
        form.preventDefault()
        const elements = form.target.elements
        const paid_amount = parseInt(elements.paid_amount.value || '0')
        const due_amount = parseInt(elements.due_amount.value || '0')
        const discount = parseInt(elements.discount.value || '0')
        const remarks = elements.remarks.value

        let data = {
            room_number: roomNumber,
            month,
            paid_amount,
            due_amount,
            discount,
            remarks,
            bill: billId,
        }
        addPaymentMutation.mutate(data)
    }

    return <div style={styles}>
        <div style={{height: 550, width: '77%', marginLeft: '20%', marginTop: 24, fontSize: 25, color: 'blue'}}>
            Payments
            <DataGrid style={{marginTop: '10px', fontSize: 12, color: 'white'}}
                      rows={payments}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      processRowUpdate={(newRow, oldRow) => {
                          if (oldRow === newRow) return
                          updatePaymentMutation.mutate(newRow);
                      }}
            />
        </div>
        <Button onClick={() => {
            if(bills.length===0){
                toast('There is no pending bill, so you cannot add new payment.', {type: 'info'})
                return
            }
            setShowAddDialog(true)
        }} sx={{backgroundColor: 'gray', marginX: "40%", marginY: 7}}>
            Add Payment
        </Button>
        <Dialog open={idToDelete !== null} onClose={() => setIdToDelete(false)}>
            <DialogTitle>Delete payment</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this payment?
                This cannot be undone.
            </DialogContent>
            <DialogActions>
                <SuiButton onClick={() => setIdToDelete(null)}>Cancel</SuiButton>
                <Button variant="contained" sx={{backgroundColor: 'red'}}
                        onClick={() => deleteMutation.mutate(idToDelete)}>
                    <Typography variant='caption' sx={{color: 'white'}}>Delete</Typography>
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
            <DialogTitle>Add Payment</DialogTitle>
            <DialogContent>
                <form onSubmit={onAdd} id="add-payment-form">
                    <FormControl fullWidth sx={{my: 1}}>
                        <InputLabel id="month-label">Room Number</InputLabel>
                        <Select
                            labelId="room-number-label"
                            label="Room number"
                            id="room_number"
                            value={roomNumber}
                            margin="dense"
                            // label="Room Number"
                            placeholder='Room Number'
                            InputLabelProps={{shrink: true}}

                            onChange={(f) => {
                                f.preventDefault();
                                setRoomNumber(f.target.value)
                            }}
                        >
                            {
                                roomNumberQuery.data.data.map((r) => (
                                    <MenuItem key={r} value={r}>{r}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{my: 1}}>
                        <InputLabel id="bill-id-label">Bill ID</InputLabel>
                        <Select
                            labelId="bill-id-label"
                            label="Bill ID"
                            id="bill_id"
                            value={billId}
                            margin="dense"
                            // label="Room Number"
                            placeholder='Bill ID'
                            InputLabelProps={{shrink: true}}

                            onChange={(f) => {
                                f.preventDefault();
                                setBillId(f.target.value)
                            }}
                        >
                            {
                                bills.map((r) => (
                                    <MenuItem key={r.id} value={r.id}>{r.id}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{my: 1}}>
                        <InputLabel id="month-label">Month</InputLabel>
                        <Select
                            labelId="month-label"
                            id="month"
                            value={month}
                            label="Month"
                            InputLabelProps={{shrink: true}}
                            onChange={(f) => {
                                f.preventDefault();
                                setMonth(f.target.value)
                            }}
                        >
                            <MenuItem key={'Baisakh'} value='BAISAKH'>Baisakh</MenuItem>
                            <MenuItem key={'Jestha'} value='JESTHA'>Jestha</MenuItem>
                            <MenuItem key={'Ashar'} value='AHAR'>Ashad</MenuItem>
                            <MenuItem key={'Shrawan'} value='SHRAWAN'>Shrawan</MenuItem>
                            <MenuItem key={'bhadra'} value='BHADRA'>Bhadra</MenuItem>
                            <MenuItem key={'Ashwin'} value='ASHWIN'>Ashwin</MenuItem>
                            <MenuItem key={'kartik'} value='KARTIK'>Kartik</MenuItem>
                            <MenuItem key={'mangshir'} value='MANGSHIR'>Mangshir</MenuItem>
                            <MenuItem key={'poush'} value='POUSH'>Poush</MenuItem>
                            <MenuItem key={'magh'} value='MAGH'>Magh</MenuItem>
                            <MenuItem key={'falgun'} value='FALGUN'>Falgun</MenuItem>
                            <MenuItem key={'chaitra'} value='CHAITRA'>Chaitra</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="paid_amount"
                        type="number"
                        fullWidth
                        variant="outlined"
                        placeholder='Paid Amount'
                        label='Paid Amount'
                        // helperText='Present Electricity Unit'
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        margin="dense"
                        id="due_amount"
                        placeholder='Due Amount'
                        label='Due Amount'
                        type="number"
                        fullWidth
                        variant="outlined"
                        // helperText= "Remarks"
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        margin="dense"
                        id="discount"
                        placeholder="Discount (in Rs.)"
                        label="Discount (in Rs.)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        // helperText= "Remarks"
                        InputLabelProps={{shrink: true}}
                    />
                    <TextField
                        margin="dense"
                        id="remarks"
                        placeholder="Remarks"
                        label="Remarks"
                        type="text"
                        fullWidth
                        variant="outlined"
                        // helperText= "Remarks"
                        InputLabelProps={{shrink: true}}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <SuiButton onClick={() => setShowAddDialog(false)}>Cancel</SuiButton>
                <Button type="submit" form="add-payment-form" variant="contained">
                    <Typography variant='caption' sx={{color: 'black'}}>Add</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}