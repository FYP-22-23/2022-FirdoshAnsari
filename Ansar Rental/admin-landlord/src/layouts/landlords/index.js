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
import { AuthorTable } from "./data/authorsTableData";
import {toast} from "react-toastify";

function Landlords() {
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
    try{
      formData.preventDefault()
      const email = formData.target.elements.email.value
      const username = formData.target.elements.username.value
      const password = formData.target.elements.password.value
      await AuthApi.Register({ username, password, email })
      const newCount = tableCounter + 1
      tableKey.current = `get_all_${newCount}_key`
      setTableCounter(newCount)
      handleCloseAddDialog()
    }catch(e){
      toast('Something went wrong', {type: 'error'})
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
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

export default Landlords;
