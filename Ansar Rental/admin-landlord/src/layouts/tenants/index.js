// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Custom styles for the Tables
import styles from "layouts/landlords/styles";

// Data
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import SuiButton from "components/SuiButton";
import React, {useRef, useState} from "react";
import AuthApi from "api/auth";
import {TenantTable} from "./data/tenantsTableData";
import {toast} from "react-toastify";
import InputAdornment from '@mui/material/InputAdornment';

function Tenants() {
    const [tableCounter, setTableCounter] = useState(0)
    const tableKey = useRef(`get_all_${tableCounter}_key`)
    const classes = styles();

    const [open, setOpen] = React.useState(false);

    // const styless = {
    //     backgroundImage: `url(${bgImage})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     width: '100%',
    //     height: '100vh',
    // };

    const handleClickOpenAddDialog = () => {
        setOpen(true);
    };

    const handleCloseAddDialog = () => {
        setOpen(false);
    };

    const handleCreateUser = async (formData) => {
        formData.preventDefault()
        try {
            const elements = formData.target.elements
            const email = elements.email.value
            const username = elements.username.value
            const password = elements.password.value
            const first_name = elements.firstname.value
            const last_name = elements.lastname.value
            const contact = elements.contact.value
            const address = elements.address.value
            const date_of_birth = elements.dob.value
            const monthly_room_rent = elements.monthlyRoomRent.value
            const monthly_water_rent = elements.monthlyWaterRent.value
            const room_number = elements.roomNo.value
            const guardian_contact_number = elements.guardianContactNo.value
            const guardian_name = elements.guardianName.value
            const number_of_tenants = elements.noOfTenants.value
            const starting_electricity_units = elements.startingElectricityUnit.value
            const starting_date = elements.startingDate.value
            await AuthApi.Register({
                username,
                password,
                email,
                first_name,
                last_name,
                monthly_room_rent,
                monthly_water_rent,
                room_number,
                guardian_name,
                guardian_contact_number,
                starting_electricity_units,
                starting_date,
                number_of_tenants,
                date_of_birth,
                contact,
                address
            })
            const newCount = tableCounter + 1
            tableKey.current = `get_all_${newCount}_key`
            setTableCounter(newCount)
            handleCloseAddDialog()
        } catch (e) {
            toast(getString(e), {type: 'error'})
        }
    }

    function getString(obj) {
        let str = '';
        for (const o in obj) {
            str += `${o} : ${obj[o]}\n`
        }
        str = str.replace('{', '')
        str = str.replace('}', '')
        str = str.replace(':', '')
        str = str.replace('detail', '')
        return str;
    }

    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <SuiBox py={3}>
                <SuiBox mb={3}>
                    <Card>
                        <SuiBox customClass={classes.tables_table}>
                            <TenantTable fetchKey={tableKey.current}/>
                        </SuiBox>
                        {/* <center> */}
                        <SuiBox m={2}>
                            <SuiButton onClick={() => {
                                handleClickOpenAddDialog()
                            }}>
                                <Typography variant="h6">Add new Tenant</Typography>
                            </SuiButton>
                        </SuiBox>
                        {/* </center> */}
                    </Card>
                </SuiBox>
            </SuiBox>
            <Dialog open={open} onClose={handleCloseAddDialog}>
                <DialogTitle style={{backgroundColor: 'pink', borderRadius: '5px'}}>Add New Tenant</DialogTitle>
                <DialogContent>
                    <form id="addUserForm" onSubmit={handleCreateUser}>
                        <TextField
                            margin="normal"
                            id="firstname"
                            placeholder="First Name"
                            type="string"
                            label="First Name"
                            required
                            fullWidth
                        />

                        <TextField
                            margin="normal"
                            id="lastname"
                            placeholder="Last Name"
                            type="string"
                            label="Last Name"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="contact"
                            placeholder="Contact"
                            type="tel"
                            label="Contact"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="address"
                            placeholder="Address"
                            type="string"
                            label="Address"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="dob"
                            placeholder="Date of Birth"
                            type="date"
                            label="Date of Birth"
                            required
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            id="email"
                            placeholder="Email Address"
                            type="email"
                            label="Email"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="username"
                            placeholder="Username"
                            type="text"
                            label="Username"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="password"
                            placeholder="Password"
                            type="password"
                            label="password"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="monthlyRoomRent"
                            placeholder="Monthly Room Rent"
                            type="number"
                            label="Monthly Room Rent"
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">NPR</InputAdornment>,
                            }}
                        />

                        <TextField
                            margin="normal"
                            id="monthlyWaterRent"
                            placeholder="Monthly water Rent"
                            type="number"
                            label="Monthly Water Rent"
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">NPR</InputAdornment>,
                            }}
                        />
                        <TextField
                            margin="normal"
                            id="roomNo"
                            placeholder="Room Number"
                            type="Number"
                            label="Room Number"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="guardianName"
                            placeholder="Guardian Name"
                            type="string"
                            label="Guardian Name"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="guardianContactNo"
                            placeholder="Guardian Contact Number"
                            type="tel"
                            label="Guardian Contact Number"
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="startingElectricityUnit"
                            placeholder="Starting Electricity Unit"
                            type="number"
                            label="Starting Electricity Unit"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="noOfTenants"
                            placeholder="Number of Tenants"
                            type="number"
                            label="Number of Tenants"
                            required
                            fullWidth
                        />
                        <TextField
                            margin="normal"
                            id="startingDate"
                            required
                            placeholder="Starting Date"
                            type="date"
                            label="Starting Date"
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <SuiButton onClick={handleCloseAddDialog}>Cancel</SuiButton>
                    <SuiButton type="submit" form="addUserForm">Create</SuiButton>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
}

export default Tenants;
