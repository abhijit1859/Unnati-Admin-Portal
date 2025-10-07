import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/Login-Page";
import { UserPage } from "./pages/UserPage";
import { AdminPage } from "./pages/AdminPage";
import { TeamManagement } from "./pages/Team-Management";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import { EditUserPage } from "./pages/EditUserPage";
import Register from "./pages/Register";
import { AttendancePage } from "./pages/AttendancePage";
 import { ProtectedRoute } from "./components/ProtectedRoute";
import { LeadsPage } from "./pages/LeadsPage";
import { AddSchoolPage } from "./pages/AddSchoolPage";

import { SideTeamPage } from "./pages/SideTeamPage";
import AssignSchool from "./pages/AssignSchool";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            !authUser ? (
              <LoginPage />
            ) : authUser.role === "ADMIN" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/user" />
            )
          }
        />

        <Route
          path="/register"
          element={
            !authUser ? (
              <Register />
            ) : authUser.role === "ADMIN" ? (
              <Navigate to="/admin" />
            ) : authUser.role === "LEAD" ? (
              <Navigate to="/lead" />
            ) : (
              <Navigate to="/user" />
            )
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lead"
          element={
            <ProtectedRoute allowedRoles={["LEAD"]}>
              <LeadsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/add" element={<AddSchoolPage/>} />

        <Route
          path="/manage"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "LEAD"]}>
              <TeamManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "LEAD"]}>
              {authUser ? (
                <AttendancePage role={authUser.role} />
              ) : (
                <div>Loading...</div>
              )}
            </ProtectedRoute>
          }
        />

       <Route
  path="/add-school"
  element={
    <ProtectedRoute allowedRoles={["ADMIN", "LEAD"]}>
      {authUser ? (
        <AddSchoolPage role={authUser.role} />
      ) : (
        <div>Loading...</div>
      )}
    </ProtectedRoute>
  }
/>


        <Route
          path="/admin/edit-user/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "LEAD"]}>
              <EditUserPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 Page Not Found</div>} />
        <Route path="/side-team" element={
          <ProtectedRoute allowedRoles={["ADMIN", "LEAD"]}>
            {authUser ? (
              <SideTeamPage role={authUser.role} />
            ) : (
                <div>loading...</div>
            )}
          </ProtectedRoute>
        } />


        <Route path="assign-team" element={<AssignSchool/>}/>
      </Routes>

      
        
      
      <Toaster />
    </>
  );
}

export default App;