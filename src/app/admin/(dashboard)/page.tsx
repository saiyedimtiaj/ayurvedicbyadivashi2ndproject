import DashboardStatistics from "@/components/DashboardStatistics";
import OrdersPage from "@/components/OrdersPage";
import React from "react";

const page = () => {
  return (
    <div>
      <DashboardStatistics />
      <OrdersPage />
    </div>
  );
};

export default page;
