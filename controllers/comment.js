import Post from "../models/post";
import Comment from "../models/comment";

export const createComment = async (req, res) => {
    try {
      // const { content, postUserId } = req.body;
      //   await Post.findOneAndUpdate(
      //     { _id: req.params.id },
      //     { $inc: { comments: 1 } }
      //   );
      //   const createComment = {
      //     content,
      //     postId: req.params.id,
      //     postUserId
      //   };
      //   const newComment = new Comment(createComment);
      //   const savedComment = await newComment.save();
      //   res.status(200).json(savedComment);
      // } catch (err) {
      //   res.status(500).json(err);
      // }
        const { postId, content, postUserId } = req.body;
        const post = await Post.findById(postId);
        if (post) {
          const newComment = new Comment({
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