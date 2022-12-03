import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName, 
      lastName,
      email,
      password,
      picturePath,
      friends,
      occupation,
      location,
      impressions,
      viewedProfile
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, hash);

    const newUser = new User({
      firstName, 
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      occupation,
      location,
      impressions: Math.floor(Math.random() * 10000),
      viewedProfile: Math.floor(Math.random() * 10000)
    })

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(!user) res.status(401).json("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) res.status(401).json("Invalid credentials");

    const token = jwt.verify({id: user._id}, process.env.JWT_SECRET); // see how to take token from jwt
    
    delete user.password;
    res.status(200).json({ token, user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}