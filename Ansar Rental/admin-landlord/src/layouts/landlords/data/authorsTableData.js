/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Images
import SuiButton from "components/SuiButton";
import Icon from "@mui/material/Icon";
import Table from "examples/Table";
import { useMutation, useQuery } from "react-query";
import { LandlordApi } from "api/landlord";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

function Author({ name, email }) {
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

export const AuthorTable = (props) => {
  console.log(props.fetchKey)
  const query = useQuery(props.fetchKey, () => LandlordApi.getAll())
  // const [open, setOpen] = useState(false)
  const [openEditId, setOpenEditId] = useState(null)
  const [openDeleteId, setOpenDeleteId] = useState(null)
  const deleteMutation = useMutation(async (uid) => {
    await LandlordApi.delete(uid)
    query.refetch()
  })

  const editMutation = useMutation(async (body) => {
    await LandlordApi.update(body.id, body)
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
      { name: "landlord", align: "left" },
      { name: "joined", align: "center" },
      { name: "actions", align: "center" },
    ],

    rows: data.map(
      author => {
        return {
          landlord: <Author name={author.username} email={author.email} />,
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
                aria-labelledby="alert-dialog-title"
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
                  <DialogTitle>Edit landlord</DialogTitle>
                  <DialogContent>
                    <form id={`editUserForm_${author.id}`}
                      onSubmit={async (f) => {
                        f.preventDefault()
                        await editMutation.mutate(
                          {
                            email: f.target.elements.email.value,
                            username: f.target.elements.username.value,
                            id: author.id,
                            joined: author.joined,
                          },
                        )
                        handleCloseEdit()
                      }}>
                      <TextField
                        autoFocus
                        margin="normal"
                        defaultValue={author.email}
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        id="username"
                        defaultValue={author.username}
                        label="Username"
                        type="text"
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
