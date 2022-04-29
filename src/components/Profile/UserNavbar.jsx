import React, { useState } from "react";
import { Box, AppBar, Tabs, Tab, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Timeline from "./Timeline";
import About from "./About";

const UserNavBar = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const userLoading = useSelector((state) => state.user.user?.pending);
  const [aboutTab, setAboutTab] = useState(false);

  const [value, setValue] = useState(0);
  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        minHeight: 50,
      }}
    >
      <AppBar position="relative" color="default">
        {user?._id === id && (
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab onClick={() => setAboutTab(false)} label="Timeline" />
            <Tab onClick={() => setAboutTab(true)} label="About" />
          </Tabs>
        )}
      </AppBar>
      {userLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>{aboutTab ? <About /> : <Timeline />}</>
      )}
    </Box>
  );
};

export default UserNavBar;
