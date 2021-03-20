import React from "react";
import useAuth from "../Hooks/useAuth";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  return (
    <div>
      <h2>{code}</h2>
    </div>
  );
};

export default Dashboard;
