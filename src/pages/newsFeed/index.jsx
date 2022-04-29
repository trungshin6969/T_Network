import React from "react";
import Navbar from "../../components/Navbar";
import { Grid, CssBaseline, Box } from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";

const Newsfeed = () => {
  return (
    <Box>
      <Navbar />
      <CssBaseline />
      <Sidebar />
      <Grid container spacing={30}>
        <Grid item xs={6}>
          <Feed />
        </Grid>
        <Grid item xs={6}>
          <Rightbar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Newsfeed;
