import React from "react";
import Navbar from "../../components/Navbar";
import { Grid, Box, CssBaseline } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import UserHeader from "../../components/Profile/UserHeader";
import Content from "../../components/Content";
import UserNavBar from "../../components/Profile/UserNavbar";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <CssBaseline />
      <Grid container>
        <Grid item>
          <Sidebar />
        </Grid>
        <Grid item>
          <Box
            paddingTop={8}
            sx={{
              position: "fixed",
              backgroundColor: "rgb(248, 249, 250)",
              width: "100%",
              height: "100%",
            }}
          >
            <Content>
              <UserHeader />
              <UserNavBar />
            </Content>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
