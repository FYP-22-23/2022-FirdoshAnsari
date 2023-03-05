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
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import SuiButton from "components/SuiButton";
import React, { useRef, useState } from "react";
import AuthApi from "api/auth";
import { TenantTable } from "./data/tenantsTableData";

function Tenants() {
  const [tableCounter, setTableCounter] = useState(0)
  const tableKey = useRef(`get_all_${tableCounter}_key`)
  const classes = styles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpenAddDialog = () => {
    setOpen(true);
  };

  const handleCloseAddDialog = () => {
    setOpen(false);
  };

  const handleCreateUser = async (formData) => {
    formData.preventDefault()
    try{
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
    await AuthApi.Register({ username, password, email, first_name, last_name, monthly_room_rent, monthly_water_rent, room_number, guardian_name, guardian_contact_number, starting_electricity_units, starting_date, number_of_tenants, date_of_birth, contact, address })
    const newCount = tableCounter + 1
    tableKey.current = `get_all_${newCount}_key`
    setTableCounter(newCount)
    handleCloseAddDialog()
    }catch(e){
      console.log(e)
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox customClass={classes.tables_table}>
              <TenantTable fetchKey={tableKey.current} />
            </SuiBox>
            {/* <center> */}
            <SuiBox m={2}>
              <SuiButton onClick={() => { handleClickOpenAddDialog() }}>
                <Typography variant="h6">Add new</Typography>
              </SuiButton>
            </SuiBox>
            {/* </center> */}
          </Card>
        </SuiBox>
      </SuiBox>
      <Dialog open={open} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Tenant</DialogTitle>
        <DialogContent>
          <form id="addUserForm" onSubmit={handleCreateUser}>
          <TextField
              margin="normal"
              id="firstname"
              label="First Name"
              type="string"
              fullWidth
            />
            <TextField
              margin="normal"
              id="lastname"
              label="Last Name"
              type="string"
              fullWidth
            />
            <TextField
              margin="normal"
              id="contact"
              label="Contact"
              type="tel"
              fullWidth
            />
            <TextField
              margin="normal"
              id="address"
              label="Address"
              type="string"
              fullWidth
            />
            <TextField
              margin="normal"
              id="dob"
              label="Date of Birth"
              type="date"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              margin="normal"
              id="username"
              label="Username"
              type="text"
              fullWidth
            />
            <TextField
              margin="normal"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              margin="normal"
              id="monthlyRoomRent"
              label="Monthly Room Rent"
              type="number"
              fullWidth
            />
            <TextField
              margin="normal"
              id="monthlyWaterRent"
              label="Monthly water Rent"
              type="number"
              fullWidth
            />
            <TextField
              margin="normal"
              id="roomNo"
              label="Room Number"
              type="Number"
              fullWidth
            />
            <TextField
              margin="normal"
              id="guardianName"
              label="Guardian Name"
              type="string"
              fullWidth
            />
            <TextField
              margin="normal"
              id="guardianContactNo"
              label="Guardian Contact Number"
              type="tel"
              fullWidth
            />
            <TextField
              margin="normal"
              id="startingElectricityUnit"
              label="Starting Electricity Unit"
              type="number"
              fullWidth
            />
            <TextField
              margin="normal"
              id="noOfTenants"
              label="Number of Tenants"
              type="number"
              fullWidth
            />
            <TextField
              margin="normal"
              id="startingDate"
              label="Starting Date"
              type="date"
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
