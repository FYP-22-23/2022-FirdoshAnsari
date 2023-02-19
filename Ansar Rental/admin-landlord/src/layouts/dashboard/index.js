// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <GradientLineChart
            title="Payment Overview"
            height="20.25rem"
            chart={gradientLineChartData}
          />
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
