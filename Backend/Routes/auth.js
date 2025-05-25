// auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../Models/user.js"

const SECRET_KEY = process.env.SECRET_KEY || "mykey"

const auth_router = express.Router();

auth_router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ _id: savedUser._id, username }, SECRET_KEY, { expiresIn: "2h" });

    res.status(201).json({
      message: "User registered",
      userId: savedUser._id,
      token
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});


auth_router.post("/login",async (req,res)=>{
    const {username,password} = req.body
    const user = await User.findOne({username})
    if(!user){
        return res.status(404).json({"message":"User doesn't exist"})
    }
    try {
        const is_match = await bcrypt.compare(password,user.password)
        if(!is_match){
            return res.status(400).json({"message":"Wrong Password"})
        }
      const token = jwt.sign({ _id: user._id, username }, SECRET_KEY, { expiresIn: "24h" });

       return res.status(200).json({
  message: `Welcome ${username}`,
  token: token,
  userId: user._id.toString()   
});

    } catch (error) {
        return res.status(500).json({"message":"Server Error"})
    }

})

auth_router.delete("/:username",async (req,res)=>{
  try{
  const username = req.params.username
  const user = await User.deleteOne({username})
  res.send(200).json({"message":"User deleted successfully"})
  }
  catch(err){
    console.log(err)
    res.send(500).json({"message":"An error occured"})
  }
})

export default auth_router;
