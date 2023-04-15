import {useState} from "react";

// @mui material components

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import {toast} from 'react-toastify'
import {Button, Input, Typography, Modal} from '@mui/material'

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import {useAuth} from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";

import {useHistory} from "react-router-dom";
import Link from "@mui/material/Link";
import {useMutation} from "react-query";
import Card from "@mui/material/Card";

function SignIn() {
    const history = useHistory();
    const {setUser} = useAuth();
    const {user} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(undefined);
    const [buttonText, setButtonText] = useState("Sign in");
    const [showRestPassword, setShowRestPassword] = useState(false)


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    const login = async (event) => {
        if (event) {
            event.preventDefault();
        }
        if (user && user.token) {
            return history.push("/dashboard");
        }
        if (username === "") {
            return setError("You must enter your username.");
        }
        if (password === "") {
            return setError("You must enter your password");
        }
        setButtonText("Signing in");
        try {
            let response = await AuthApi.Login({
                username,
                password,
            });
            if ('error' in response.data) {
                setButtonText("Sign in")
                return toast(response.data.error.toString(), {type: 'error'});
            }
            return setProfile(response);
        } catch (err) {
            setButtonText("Sign in");
            if (err.response) {
                return setError(err.response.data.msg);
            }
            return setError("There has been an error.");
        }
    };

    const setProfile = async (response) => {
        let user = {...response.data.user};
        user.token = response.data.token;
        user = JSON.stringify(user);
        setUser(user);
        localStorage.setItem("user", user);
        return history.push("/dashboard");
    };

    return (
        <CoverLayout
            title="Ansar Rental"
            description={`${user && user.token ? "" : "Enter your username and password to sign in"}`}
            image={curved9}
        >
            {user && user.token ? (
                <div>
                    <h3 style={{textAlign: "center"}}>You are already signed in.</h3>
                    <SuiBox mt={4} mb={1}>
                        <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={login}>
                            {`Let's go`}
                        </SuiButton>
                    </SuiBox>
                </div>
            ) : (
                <SuiBox component="form" role="form">
                    <SuiBox mb={2}>
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography component="label" variant="caption" fontWeight="bold">
                                Username
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            defaultValue={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setError(undefined);
                            }}
                            type="username"
                            placeholder="Username"
                        />
                    </SuiBox>
                    <SuiBox mb={2}>
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography component="label" variant="caption" fontWeight="bold">
                                Password
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError(undefined);
                            }}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <SuiTypography
                            variant="caption"
                            fontWeight="bold"
                            color="primary"
                            onClick={handleTogglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox display="flex" alignItems="center">
                        <Link onClick={() => {
                            setShowRestPassword(true)
                        }} sx={{marginLeft: 8}}>
                            Forgot password?
                        </Link>
                        <ResetPasswordModal open={showRestPassword} setOpen={setShowRestPassword}/>
                    </SuiBox>
                    <SuiBox mt={2} mb={2} textAlign="center">
                        <h6
                            style={{
                                fontSize: ".8em",
                                color: "red",
                                textAlign: "center",
                                fontWeight: 400,
                                transition: ".2s all",
                            }}
                        >
                            {error}
                        </h6>
                    </SuiBox>

                    <SuiBox mt={4} mb={1}>
                        <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={login}>
                            {buttonText}
                        </SuiButton>
                    </SuiBox>
                </SuiBox>
            )}
        </CoverLayout>
    );
}

function ResetPasswordModal({open, setOpen}) {
  const [email, setEmail] = useState('')

  const mutation = useMutation((email) => AuthApi.sendPasswordResetEmail(email), {
    onSuccess: () => {
      setOpen(false)
      toast('Email sent', {type: 'success'})
    },
    onError: error => toast(error.toString(), {type: 'error'}),
  })

  return (
      <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Card
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
        >
          <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
          >
            Reset Password
          </Typography>
          <Input
              sx={{my: 3}}
              color="primary"
              placeholder="Enter your email"
              type="email"
              required={true}
              value={email}
              onChange={(e) => {
                e.preventDefault()
                setEmail(e.target.value)
              }}
          />
          <Button
              color="primary"
              onClick={() => {
                if (email === '') return
                mutation.mutate(email)
              }}
              loading={mutation.isLoading}
              disabled={mutation.isLoading}
              size="md"
          >
            Send Password Reset Email
          </Button>
        </Card>
      </Modal>
  )
}

export default SignIn
