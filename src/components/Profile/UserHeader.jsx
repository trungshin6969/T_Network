import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/apiRequests";
import { styled } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  width: "calc(100%)",
  top: "-70px",
  alignItems: "flex-end",
  "& > *": {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
  },
}));

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  border: `3px solid white`,
  width: theme.spacing(13),
  height: theme.spacing(13),
  boxShadow: theme.shadows[3],
}));

const UserHeader = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const currentUser = useSelector((state) => state.user.otherUser?.otherUser);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    getUser(dispatch, id, user?.accessToken);
  }, []);

  return (
    <>
      <div
        style={{
          height: "200px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "contrast(75%)",
          backgroundImage: `url(${currentUser?.coverPhoto})`,
        }}
      />
      <div
        style={{
          position: "relative",
          height: "100px",
        }}
      >
        <Header>
          <Avatar alt={currentUser?.username} src={currentUser?.avatar} />
          <Typography variant={"h5"}>{currentUser?.username}</Typography>
        </Header>
      </div>
    </>
  );
};

export default UserHeader;
