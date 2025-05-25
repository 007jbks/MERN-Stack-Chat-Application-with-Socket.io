import express from "express";
import authenticateToken from "../Middleware/token.js";
import User from "../Models/user.js";
import Message from "../Models/message.model.js";
const message = express.Router();

message.get("/users", authenticateToken, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;  
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("_id username")
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


message.post("/send",authenticateToken,async (req,res)=>{
    try {
        const senderId = req.user._id
        const receiverId = req.body.receiverId
        const message = req.body.message
          if (!receiverId || !message) {
      return res.status(400).json({ message: "receiverId and content required" });
    }
        const newmessage = new Message({
            sender : senderId,
            receiver : receiverId,
            content : message
        })
        await newmessage.save()
        res.status(200).json({"message":"Message Delivered"})

    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"An error occuerred"})
    }
})
message.get("/chats", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const otherId = req.query.otherId; 

    if (!otherId) {
      return res.status(400).json({ message: "otherId query parameter required" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherId },
        { sender: otherId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
}); 

export default message;
