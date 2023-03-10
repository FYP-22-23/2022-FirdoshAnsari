import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Custom styles for Header
import styles from "layouts/profile/components/Header/styles";

import { useAuth } from "auth-context/auth.context";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal")
  const classes = styles()

  const { user } = useAuth()

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  return (
    <SuiBox position="relative">
      <DashboardNavbar absolute light />
      <SuiBox customClass={classes.profileHeader_background} />
      <center>
      <Card className={classes.profileHeader_profile}>
        <SuiBox height="100%" mt={0.5} lineHeight={1}>
            <SuiTypography variant="h5" fontWeight="medium">
              {user.username}
            </SuiTypography>
            <SuiTypography variant="button" textColor="text" fontWeight="medium">
              {user.is_admin === true ? 'Admin' : 'Landlord'}
            </SuiTypography>
        </SuiBox>
      </Card>
      </center>
    </SuiBox>
  );
}

export default Header;
