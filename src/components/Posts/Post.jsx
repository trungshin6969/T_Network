import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { likePost, unLikePost, deletePost } from "../../redux/apiRequests";
import LikeButton from "../LikeButton";
import setDelete from "../../redux/navigateSlice";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const user = useSelector((state) => state.user.user?.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === user?._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, user?._id]);

  const handleLike = () => {
    setIsLike(true);
    likePost(dispatch, user?.accessToken, post, user);
  };

  const handleUnLike = () => {
    setIsLike(false);
    unLikePost(dispatch, user?.accessToken, post, user?._id);
  };

  const handleDelete = (id) => {
    deletePost(dispatch, user?.accessToken, id, user?._id, setDelete);
  };

  return (
    <Card
      sx={{
        borderRadius: "14px",
        margin: 5,
      }}
      post={post}
    >
      <CardHeader
        avatar={
          <IconButton
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              alt="Travis Howard"
              src={post?.avatar}
              onClick={() => navigate(`/users/${post?.userId}`)}
            />
          </IconButton>
        }
        action={
          <IconButton
            id="more_icon"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.username}
        subheader={moment(post?.createdAt).fromNow()}
      />
      {user?._id === post?.userId && (
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "more_icon",
          }}
        >
          <MenuItem>Edit Post</MenuItem>
          <MenuItem onClick={() => handleDelete(post?._id)}>
            Remove Post
          </MenuItem>
        </Menu>
      )}
      <CardContent>
        <Typography variant="body2">{post?.description}</Typography>
        {post?.img && (
          <div>
            <img
              style={{
                marginTop: "1rem",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              src={post?.img}
              alt="postImg"
            />
          </div>
        )}
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </IconButton>

        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
      <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
        {post?.likes.length} likes
      </h6>
    </Card>
  );
};

export default Post;
