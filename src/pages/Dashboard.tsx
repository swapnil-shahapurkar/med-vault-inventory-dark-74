
import AppLayout from "../components/layout/AppLayout";
import { DashboardStats } from "../components/dashboard/DashboardStats";

const Dashboard = () => {
  return (
    <AppLayout title="Dashboard">
      <DashboardStats />
    </AppLayout>
  );
};

export default Dashboard;
