import {Backdrop, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography,} from '@mui/material'
import {LandlordApi} from 'api/landlord'
import React, {useState} from 'react'
import {useMutation, useQuery} from 'react-query'
import {toast} from 'react-toastify'
import bgImage from '../../assets/images/g.jpg';


export default function GenerateBill() {
    const generateBillMutation = useMutation((data) => LandlordApi.generateBill(data),
        {
            onSuccess: () => toast('Bill sent', {type: 'success'}),
            onError: (e) => toast(`Something went wrong. ${e}`, {type: 'error'}),
        },
       
    )
    const [roomNumber, setRoomNumber] = useState(null)
    const [month, setMonth] = useState('BAISAKH')

    const roomNumberQuery = useQuery('room_numbers', () => LandlordApi.getRoomNumbers(), {onSuccess: (d) => setRoomNumber(d.data[0])})

    if (roomNumberQuery.isLoading) return null

    function onAdd(form) {
        form.preventDefault()
        const elements = form.target.elements
        const present_electricity_unit = parseInt(elements.present_electricity_unit.value || '0')
        const due_amount = parseInt(elements.due_amount.value || '0')
        const electricity_rate = parseInt(elements.electricity_rate.value || '0')
        const previous_electricity_unit = parseInt(elements.previous_electricity_unit.value || '0')
        const discount = parseInt(elements.discount.value || '0')
        const remarks = elements.remarks.value

        // if(roomNumber===null || month === null || present_electricity_unit === null || previous_electricity_unit === null || due_amount === null || electricity_rate===null
        // || roomNumber===undefined || month === undefined || present_electricity_unit === undefined || previous_electricity_unit === undefined || due_amount === undefined || electricity_rate===undefined
        //     ){
        //        toast('Invalid form', {type: 'error'})
        //         return
        //     }

        let data = {
            room_number: roomNumber,
            month,
            present_electricity_unit,
            previous_electricity_unit,
            electricity_rate,
        }

        if (due_amount !== null) {
            data = {...data, due_amount}
        }

        if (discount !== null) {
            data = {...data, discount}
        }
        if (remarks !== null) {
            data = {...data, remarks}
        }
        generateBillMutation.mutate(data)
    }
    const styles = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
    };

    return (
        <div style={styles}>
            <Backdrop open={roomNumberQuery.isLoading || generateBillMutation.isLoading} onClick={() => {
            }}/>
            {
                roomNumberQuery.isSuccess && !generateBillMutation.isLoading &&
                <form onSubmit={onAdd} id="generate-bill-form">
                    <Box sx={{paddingX: 50}}>
                        <Typography variant='h2' sx={{margin: '20px'}}>Generate Bill</Typography>
                        <>
                            <FormControl fullWidth>
                            </FormControl>
                            <FormControl fullWidth sx={{my: 1}}>
                                <InputLabel>Room Number</InputLabel>
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
                                            <MenuItem key={`${r}_key`} value={r}>{r}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{my: 1}}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    margin= "dense"
                                    labelId="month-label"
                                    label="Month"
                                    id="month"
                                    value={month}
                                    // label="Month"
                                    placeholder="Month"
                                    InputLabelProps={{shrink: true}}
                                    onChange={(f) => {
                                        f.preventDefault();
                                        setMonth(f.target.value)
                                    }}
                                >
                                    <MenuItem key={'Baisakh'} value='BAISAKH'>Baisakh</MenuItem>
                                    <MenuItem key={'Jestha'} value='JESTHA'>Jestha</MenuItem>
                                    <MenuItem key={'Ashar'} value='ASHAR'>Ashad</MenuItem>
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
                                id="present_electricity_unit"
                                type="number"
                                label='Present Electricity Unit'
                                fullWidth
                                variant="outlined"
                                placeholder='Present Electricity Unit'
                                // helperText='Present Electricity Unit'
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="previous_electricity_unit"
                                type="number"
                                fullWidth
                                variant="outlined"
                                label='Previous Electricity Unit'
                                placeholder='Previous Electricity Unit'
                                // helperText= "Prevous Electricity Unit"
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField
                                margin="dense"
                                id="due_amount"
                                placeholder='Due Amount'
                                type="number"
                                fullWidth
                                variant="outlined"
                                label="Due Amount"
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField

                                required
                                margin="dense"
                                id="electricity_rate"
                                placeholder="Electricity Rate"
                                type="number"
                                fullWidth
                                variant="outlined"
                                label="Electricity Rate"
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField

                                margin="dense"
                                id="discount"
                                placeholder="Discount (in Rs.)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                label="Discount"
                                InputLabelProps={{shrink: true}}
                            />
                            <TextField

                                margin="dense"
                                id="remarks"
                                placeholder="Remarks"
                                type="text"
                                fullWidth
                                variant="outlined"
                                label="Remarks"
                                InputLabelProps={{shrink: true}}
                            />
                        </>
                        <center>
                            <Button type="submit" form="generate-bill-form" sx={{m: 4, px: 4, py: 1}} variant="contained">
                                <Typography variant='caption' sx={{color: 'black', fontSize: 16}}>Send Bill </Typography>
                            </Button>
                        </center>
                    </Box>
                </form>
            }
        </div>
    )
}
