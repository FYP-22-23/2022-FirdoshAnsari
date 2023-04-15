// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/profile/components/Header";
import {Button, Dialog, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {useMutation} from "react-query";
import AuthApi from "../../api/auth";
import {toast} from "react-toastify";

function Overview() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const changePasswordMutation = useMutation(
        {
            mutationFn: (d) => AuthApi.ChangePassword(d),
            onSuccess: d => {
                toast('Successfully changed password')
                handleClose()
            },
            onError: err => toast('Something went wrong', {type: 'error'})
        }
    )

    function onChangePasswordFormSubmit(event) {
        event.preventDefault()
        const elements = event.target.elements
        const old_password = elements.old_password.value
        const new_password = elements.new_password.value
        const confirm_password = elements.confirm_password.value

        if (old_password === null || old_password.length === 0) {
            return toast('Old password is required', {type: 'warning'})
        }
        if (new_password === null || new_password.length === 0) {
            return toast('New password is required', {type: 'warning'})
        }
        if (confirm_password === null || confirm_password.length === 0) {
            return toast('Confirm password is required', {type: 'warning'})
        }
        if (confirm_password !== new_password) {
            return toast('Passwords did not match', {type: 'warning'})
        }
        changePasswordMutation.mutate({old_password, new_password, confirm_password})
    }

    return (
        <DashboardLayout>
            <Header/>
            <center>
                <Button variant='outlined' sx={{my: 4}} onClick={handleClickOpen}>Change Password</Button>
            </center>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Change Password
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onChangePasswordFormSubmit}>
                        <Stack sx={{m: 2}} gap={2}>
                            <TextField id={'old_password'} label='Old Password' size='small'
                                       inputProps={{style: {fontSize: 16}}}
                                       InputLabelProps={{style: {fontSize: 16}}}
                            />
                            <TextField id={'new_password'} label='New Password' size='small'
                                       inputProps={{style: {fontSize: 16}}}
                                       InputLabelProps={{style: {fontSize: 16}}}
                            />
                            <TextField id={'confirm_password'} label='Confirm New Password' size='small'
                                       inputProps={{style: {fontSize: 16}}}
                                       InputLabelProps={{style: {fontSize: 16}}}
                            />
                            <Button type="submit">
                                Change password
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default Overview;
