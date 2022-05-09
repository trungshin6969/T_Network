import Post from "../models/post";
import User from "../models/user";
import cloudinary from "../utils/cloudinary";

export const createPost = async (req, res) => {
  try {
    const users = await User.findById(req.body.userId);
    if (req.body.img) {
      const result = await cloudinary.uploader.upload(req.body.img, {
        upload_preset: "network_library",
      });
      const createPost = {
        ...req.body,
        img: result.secure_url,
        cloudinaryId: result.public_id,
        username: users.username,
        avatar: users.avatar,
      };
      const newPost = new Post(createPost);
      const post = await newPost.save(); //save post information to the model
      res.status(200).json(post);
    } else {
      const createPost = {
        ...req.body,
        username: users.username,
        avatar: users.avatar,
      };
      const newPost = new Post(createPost);
      const post = await newPost.save();
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //find the post ID in post model
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      return res.status(403).json("You can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //find the post ID in post model
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      return res.status(403).json("You can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getAPost = async (req, res) => {
  try {
    //find the post ID
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPostFromUser = async (req, res) => {
  try {
    const post = await Post.find({ userId: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getFriendsPost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPost = await Post.find({ userId: req.body.userId });
    const friendPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPost.concat(...friendPost));
  } catch (err) {
    res.status(500).json(err);
  }
};

export const likePost = async (req, res) => {
  try {
    const like = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user.id },
      },
      { new: true }
    );

    if (like) {
      res.status(200).json("Liked Post!");
    } else {
      return res.status(400).json("This post does not exist.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const unLikePost = async (req, res) => {
  try {
    const like = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user.id },
      },
      { new: true }
    );

    if (like) {
      res.status(200).json("UnLiked Post!");
    } else {
      return res.status(400).json("This post does not exist.");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createComment = async (req, res) => {
  try {
      const { postId, content, postUserId } = req.body;
      const post = await Post.findById(postId);
      if (post) {
        const newComment = new Comments({
            user: req.user.id, content, postUserId, postId
        });

        await Post.findOneAndUpdate({_id: postId}, {
            $push: {comments: newComment.id}
        }, {new: true});

        const savedComment = await newComment.save();

        res.status(200).json(savedComment);
      } else {
        return res.status(400).json("This post does not exist.");
      }  
  } catch (err) {
      return res.status(500).json(err)
  }
};