import { useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { useAuth } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";

import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  const { setUser } = useAuth();
  const { user } = useAuth();

  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign in");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

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
      if (response.data && response.data.success === false) {
        return setError(response.data.msg);
      }
      return setProfile(response);
    } catch (err) {
      console.log(err);
      setButtonText("Sign in");
      if (err.response) {
        return setError(err.response.data.msg);
      }
      return setError("There has been an error.");
    }
  };

  const setProfile = async (response) => {
    let user = { ...response.data.user };
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
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
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
              defaultValue={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(undefined);
              }}
              type="password"
              placeholder="Password"
            />
          </SuiBox>
          <SuiBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SuiTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              customClass="cursor-pointer user-select-none"
            >
              &nbsp;&nbsp;Remember me
            </SuiTypography>
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

export default SignIn;
