import React from "react";
import { Routes, Route } from "react-router-dom";
import EditOwnProfileForm from "../../components/users/EditOwnProfileForm.jsx";

const DashboardPage = () => {
  return (
    <Routes>
      <Route path="edit-profile" element={<EditOwnProfileForm />} />
    </Routes>
  );
};

export { DashboardPage };
