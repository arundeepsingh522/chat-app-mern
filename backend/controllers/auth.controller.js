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
    const emailExits = await User.findOne({ email });
    if (emailExits) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
   

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png`;
    const girlProfilePic = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-1024.png`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      email,
    });

    
      // Generate JWT token here
      await newUser.save();
      const token =generateTokenAndSetCookie(newUser._id, res);

      console.log('token generated',token);
      

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        email: newUser.email,
        token,

      });
    
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
    const user = await User.findOne({ email:searchEmail });
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

export const updateProfilePic = async (req, res) => {
  try {
    const { username, updatedProfilePic } = req.body;
    console.log('username',username);
    console.log('updatedProfilePic',updatedProfilePic);

    // Input Validation
    if (!username || !updatedProfilePic) {
      return res.status(400).json({ error: "Username and updatedProfilePic are required." });
    }

    const user = await User.findOne({ username });

    console.log('user fetched during in updateProfilePic controller');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.profilePic = updatedProfilePic;
    await user.save();

    console.log("Profile pic is updated");
    return res.status(200).json({ message: "Profile picture updated successfully" });

  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
