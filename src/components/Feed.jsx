import { Grid, Box } from "@mui/material";
import CreatePost from "./Posts/CreatePosts";
import FullPost from "./Posts/Posts";
// import { useSelector } from "react-redux";
// import CircularProgress from "@mui/material/CircularProgress";

const Feed = () => {
  // const posts = useSelector((state) => state.post.allPosts?.posts);
  // const postLoading = useSelector((state) => state.post.allPosts?.pending);

  return (
    <Box
      flex={4} 
      p={{ xs: 0, md: 2 }}
      sx={{
        position: "fixed",
        backgroundColor: "rgb(248, 249, 250)",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "50%",
        }}
        ml={14}
        mt={-1}
        direction="column"
      >
        {/* <Grid item> */}
          <CreatePost />
        {/* </Grid> */}
        {/* <Grid item> */}
          {/* {postLoading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : ( */}
          <FullPost />
          {/* )} */}
        {/* </Grid> */}
      </Grid>
    </Box>
  );
};
export default Feed;
