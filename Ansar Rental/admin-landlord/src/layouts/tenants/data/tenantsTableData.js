/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Images
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import Table from "examples/Table";
import { useMutation, useQuery } from "react-query";
import { TenantApi } from "api/tenant";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

function Tenant({ name, email }) {
  return (
    <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <SuiBox display="flex" flexDirection="column">
        <SuiTypography variant="button" fontWeight="medium">
          {name}
        </SuiTypography>
        <SuiTypography variant="caption" textColor="secondary">
          {email}
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

export const TenantTable = (props) => {
  const query = useQuery(props.fetchKey, () => TenantApi.getAll())
  // const [open, setOpen] = useState(false)
  const [openEditId, setOpenEditId] = useState(null)
  const [openDeleteId, setOpenDeleteId] = useState(null)
  const deleteMutation = useMutation(async (uid) => {
    await TenantApi.delete(uid)
    query.refetch()
  })

  const editMutation = useMutation(async (body) => {
    await TenantApi.update(body.id, body)
    query.refetch()
  })

  if (!query.isSuccess) return null

  const data = formatData(query.data.data, deleteMutation, editMutation, openEditId, setOpenEditId, openDeleteId, setOpenDeleteId);

  return (<Table rows={data.rows} columns={data.columns} />)
}

const formatData = (data, deleteMutation, editMutation, openEditId, setOpenEditId, openDeleteId, setOpenDeleteId) => {
  // const handleOpen = () => setOpen(true)

  const handleCloseEdit = () => setOpenEditId(null)
  const handleCloseDelete = () => setOpenDeleteId(null)

  return {
    columns: [
      { name: "tenant", align: "left" },
      { name: "room_number", align: "center" },
      { name: "name", align: "center" },
      { name: "guardian", align: "center" },
      { name: "monthly_room_rent", align: "center" },
      { name: "monthly_water_rent", align: "center" },
      { name: "joined", align: "center" },
      { name: "number_of_tenants", align: "center" },
      { name: "date_of_birth", align: "center" },
      { name: "starting_electricity_units", align: "center" },
      { name: "contact", align: "center" },
      { name: "address", align: "center" },
      { name: "notes", align: "center" },
      { name: "actions", align: "center" },
    ],

    rows: data.map(
      author => {
        return {
          tenant: <Tenant name={author.username} email={author.email} />,
          room_number: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.room_number}
              </SuiTypography>
          ),
          name: <Tenant name={author.first_name} email={author.last_name} />,      //adding

          guardian: <Tenant name={author.guardian_name} email={author.guardian_contact_number} />,

          monthly_room_rent: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.monthly_room_rent}
              </SuiTypography>
          ),
          monthly_water_rent: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.monthly_water_rent}
              </SuiTypography>
          ),
          starting_electricity_units: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.starting_electricity_units}
              </SuiTypography>
          ),
          number_of_tenants: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.number_of_tenants}
              </SuiTypography>
          ),
          date_of_birth: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.date_of_birth}
              </SuiTypography>
          ),
          contact: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.contact}
              </SuiTypography>
          ),
          address: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.address}
              </SuiTypography>
          ),
          notes: (
              <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
                {author.notes}
              </SuiTypography>
          ),
          joined: (
            <SuiTypography variant="caption" textColor="secondary" fontWeight="medium">
              {author.joined}
            </SuiTypography>
          ),
          actions: (
            <>
              <SuiBox display="flex" flexDirection="row">
                <SuiBox mx={4}>
                  <SuiButton buttonColor="secondary" iconOnly={true} onClick={() => setOpenEditId(author.id)}>
                    <Icon>edit</Icon>
                  </SuiButton>
                </SuiBox>
                <SuiButton
                  buttonColor="error"
                  iconOnly={true}
                  variant="outlined"
                  onClick={() => setOpenDeleteId(author.id)}
                >
                  <Icon>delete</Icon>
                </SuiButton>
              </SuiBox>
              <Dialog
                open={openDeleteId == author.id}
                onClose={handleCloseDelete}
                aria-placeholderledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure you want to delete {author.username}?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This action cannot be undone.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <SuiButton onClick={handleCloseDelete}>Disagree</SuiButton>
                  <SuiButton onClick={() => deleteMutation.mutate(openDeleteId)} autoFocus>
                    Agree
                  </SuiButton>
                </DialogActions>
              </Dialog>
              {
                <Dialog open={openEditId == author.id} onClose={handleCloseEdit} >
                  <DialogTitle>Edit Tenant</DialogTitle>
                  <DialogContent>
                    <form id={`editUserForm_${author.id}`}
                      onSubmit={async (f) => {
                        f.preventDefault()
                        const elements = f.target.elements
                        const email = elements.email.value
                        const username = elements.username.value
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
                        const id = author.id
                        await editMutation.mutate(
                          { id, username, email, first_name, last_name, monthly_room_rent, monthly_water_rent, room_number, guardian_name, guardian_contact_number, starting_electricity_units, starting_date, number_of_tenants, date_of_birth, contact, address },
                        )
                        handleCloseEdit()
                      }}>
                      <TextField
                        margin="normal"
                        defaultValue={author.first_name}
                        id="firstname"
                        placeholder="First Name"
                        type="string"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.last_name}
                        id="lastname"
                        placeholder="Last Name"
                        type="string"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.contact}
                        id="contact"
                        placeholder="Contact"
                        type="tel"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.address}
                        id="address"
                        placeholder="Address"
                        type="string"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.date_of_birth}
                        id="dob"
                        placeholder="Date of Birth"
                        type="date"
                        fullWidth
                      />
                      <TextField
                        autoFocus
                        defaultValue={author.email}
                        margin="normal"
                        id="email"
                        placeholder="Email Address"
                        type="email"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.username}
                        id="username"
                        placeholder="Username"
                        type="text"
                        fullWidth
                      />
                      {/* <TextField
                        margin="normal"
                        defaultValue={author.first_name}
                        id="password"
                        placeholder="Password"
                        type="password"
                        fullWidth
                      /> */}
                      <TextField
                        margin="normal"
                        defaultValue={author.monthly_room_rent}
                        id="monthlyRoomRent"
                        placeholder="Monthly Room Rent"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.monthly_water_rent}
                        id="monthlyWaterRent"
                        placeholder="Monthly water Rent"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.room_number}
                        id="roomNo"
                        placeholder="Room Number"
                        type="Number"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.guardian_name}
                        id="guardianName"
                        placeholder="Guardian Name"
                        type="string"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.guardian_contact_number}
                        id="guardianContactNo"
                        placeholder="Guardian Contact Number"
                        type="tel"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.starting_electricity_units}
                        id="startingElectricityUnit"
                        placeholder="Starting Electricity Unit"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.number_of_tenants}
                        id="noOfTenants"
                        placeholder="Number of Tenants"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        defaultValue={author.starting_date}
                        id="startingDate"
                        placeholder="Starting Date"
                        type="date"
                        fullWidth
                      />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <SuiButton onClick={handleCloseEdit}>Cancel</SuiButton>
                    <SuiButton type="submit" form={`editUserForm_${author.id}`}>Update</SuiButton>
                  </DialogActions>
                </Dialog>
              }
            </>
          ),
        }
      }
    )
  }
}
