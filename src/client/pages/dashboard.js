import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Logout from "../components/Logout";
import Profile from "../components/Profile";
import RolesList from "../components/RolesList";
import MyCan from "../components/MyCan";

const DashboardPage = () => (
  <AuthConsumer>
    {({authenticated, roles}) => 
        authenticated ? (
          <div>
            <h1>Dashboard</h1>
            <Logout />
            <Profile />
            <MyCan 
              perform="auth:roles:query" 
              yes={() => <RolesList roles={roles}/>} />
          </div>
        ) : (<Redirect to="/" />)
    }
  </AuthConsumer>
);

export default DashboardPage;
