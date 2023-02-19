// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Custom styles for the Tables
import styles from "layouts/landlordsOrTenants/styles";

// Data
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import SuiButton from "components/SuiButton";
import React, { useRef, useState } from "react";
import AuthApi from "api/auth";
import { AuthorTable } from "./data/authorsTableData";

function LandlordsOrUsers() {
  const [tableCounter, setTableCounter] = useState(0)
  const tableKey = useRef(`get_all_${tableCounter}_key`)
  const classes = styles();

  console.log(tableKey.current)

  const [open, setOpen] = React.useState(false);

  const handleClickOpenAddDialog = () => {
    setOpen(true);
  };

  const handleCloseAddDialog = () => {
    setOpen(false);
  };

  const handleCreateUser = async (formData) => {
    formData.preventDefault()
    const email = formData.target.elements.email.value
    const username = formData.target.elements.username.value
    const password = formData.target.elements.password.value
    await AuthApi.Register({ username, password, email })
    const newCount = tableCounter + 1
    tableKey.current = `get_all_${newCount}_key`
    console.log(tableKey.current)
    setTableCounter(newCount)
    handleCloseAddDialog()
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Landlords</SuiTypography>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
              <AuthorTable fetchKey={tableKey.current} />
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
        <DialogTitle>Add new landlord</DialogTitle>
        <DialogContent>
          <form id="addUserForm" onSubmit={handleCreateUser}>
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

export default LandlordsOrUsers;
