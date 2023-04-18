import { useEffect } from "react";
// import AuthApi from "../../../api/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";

function SignOut() {
  const history = useHistory();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    // await AuthApi.Logout(user);
    await setUser(null);
    localStorage.removeItem("user");
    return history.push("/authentication/sign-in");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}

export default SignOut;
