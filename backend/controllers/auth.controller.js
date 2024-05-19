import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    console.log("console log", req.body);
    const { fullName, username, password, confirmPassword, gender, email } =
      req.body;
    console.log("mail", email, "name", fullName);
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const emailExits = await User.findOne({ email });
    if (emailExits) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png`;
    const girlProfilePic = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-1024.png`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      email,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    console.log("login body", req.body);
    const { email, password } = req.body;
    console.log("email getting", email);
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    console.log("user:", user);

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    console.log("succes login");

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchEmail = async (req, res) => {
  try {
    console.log("seacrhEamil body", req.body);
    const { email } = req.body;
    console.log("email getting", email);
    const user = await User.findOne({ email });
    console.log("user:", user);

    if (!user) {
      //user not found
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Password reset instructions sent" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserData = async (req, res) => {
  try {
    console.log("update user data body", req.body);
    const { searchEmail, password } = req.body;
    console.log("passord in update", password);
    const user = await User.findOne({ searchEmail });
    console.log("user:", user);
    if (!user) {
      //user not found
      return res.status(404).json({ error: "User not found" });
    }
    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    console.log("password update");
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfilePic =async (req, res) => {
  try {

    
    const { userEmail,updatedProfilePic} = req.body;
    console.log('req body',req.body)
    console.log('user email =',userEmail);
    const user = await User.findOne({ email:userEmail });
    console.log("user found: ", user);

    user.profilePic=updateProfilePic;
    await user.save();
    console.log("profile pic updated");
    return res.status(200).json({ message: "Password updated successfully" });
    if (!user) {
      //user not found
      return res.status(404).json({ error: "User not found" });
    }

  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};