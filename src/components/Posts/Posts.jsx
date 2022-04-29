import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { getAllPosts } from "../../redux/apiRequests";
import Post from "./Post";
import { Box, CircularProgress } from "@mui/material";

const TOTAL_PAGES = 4;

const FullPost = () => {
  const posts = useSelector((state) => state.post.allPosts?.posts);
  const user = useSelector((state) => state.user.user?.currentUser);
  const [pageNumber, setPageNumber] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [loading, setLoading] = useState(true);

  // const createPost = useSelector((state) => state.post.createPost);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNumber((pre) => pre + 1);
      }
    })
  );

  // const handleScroll = (e) => {
  //     const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
  //     if (scrollHeight - scrollTop === clientHeight) {
  //         setPageNumber((pre) => pre + 1);
  //     }
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    if (pageNumber <= TOTAL_PAGES) {
      getAllPosts(dispatch, user?.accessToken, setLoading, pageNumber);
    }
  }, [user, dispatch, setLoading, pageNumber]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return (
    <>
      <div>
        {posts.length > 0 &&
          posts.map((post, index) => {
            return index === posts.length - 1 &&
              !loading &&
              pageNumber <= TOTAL_PAGES ? (
              <div key={post._id} ref={setLastElement}>
                <Post post={post} />
              </div>
            ) : (
              <Post key={post._id} post={post} />
            );
          })}
      </div>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default FullPost;
