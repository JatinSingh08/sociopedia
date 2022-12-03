import Post from "../models/Posts.js"

export const createPost = async (req,res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      occupation: user.occupation,
      description, 
      location: user.location,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })
    
    await newPost.save();
    const post = await Post.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.send(201).json(post);
  } catch (error) {
    res.send(401).json({message: error.message });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({userId});

    res.status(201).json(post);
  } catch (error) {
    res.status(403).json({ message: error.message })
  }
}

export const likePosts = async (req, res) => {
  try {
    const {id} = req.params;
    const {userId} = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if(isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true})
    res.status(201).json(updatedPost);

  } catch (error) {
    res.staus(403).json({message: error.message});
  }
}