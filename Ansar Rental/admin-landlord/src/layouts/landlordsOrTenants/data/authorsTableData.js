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
  const deleteMutation = useMutation(async (uid)=>{
    await LandlordApi.delete(uid)
    query.refetch()
  })

  if (!query.isSuccess) return null

  const data = formatData(query.data.data, deleteMutation);

  return (<Table rows={data.rows} columns={data.columns} />)
}

const formatData = (data, deleteMutation) => {
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

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
              23/04/18
            </SuiTypography>
          ),
          actions: (
            <>
              <SuiBox display="flex" flexDirection="row">
                <SuiBox mx={4}>
                  <SuiButton buttonColor="secondary" iconOnly={true} onClick={() => console.log("edit")}>
                    <Icon>edit</Icon>
                  </SuiButton>
                </SuiBox>
                <SuiButton
                  buttonColor="error"
                  iconOnly={true}
                  variant="outlined"
                  onClick={()=>deleteMutation.mutate(author.id)}
                  // onClick={()=>handleOpen(author.id)}
                >
                  <Icon>delete</Icon>
                </SuiButton>
              </SuiBox>
              {/* <Dialog
                open={open}
                onClose={handleClose}
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
                  <SuiButton onClick={handleClose}>Disagree</SuiButton>
                  <SuiButton onClick={handleClose} autoFocus>
                    Agree
                  </SuiButton>
                </DialogActions>
              </Dialog> */}
            </>
          ),
        }
      }
    )
  }
}
