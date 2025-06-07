import React, { useState, useEffect ,useRef} from "react";
import { io } from "socket.io-client";
import "./chat.css";
import {useNavigate} from 'react-router-dom';

export default function Chat({setAuthenticated}) {
 
  const logout = ()=>{
  setAuthenticated(false);
}
  const token = localStorage.getItem("token");
  const id = localStorage.getItem('id');
  const [users, setUsers] = useState([]);
  const [showPeople, setShowPeople] = useState(true);
  const [messages,setMessages] = useState([]);
  const [receiverId,setreceiverId] = useState("");
  const [content, setContent] = useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(null);
 const socket = useRef(null); // Use ref so it persists across renders

useEffect(() => {
  socket.current = io("http://localhost:5001"); // your backend Socket.IO URL
  socket.current.on("receive-message", (msg) => {
    if (msg.sender === selectedUserId || msg.receiver === selectedUserId) {
      setMessages((prev) => [...prev, msg]);
    }
  });

  return () => {
    socket.current.disconnect();
  };
}, [selectedUserId]);

const send = (receiverId, message) => {
  fetch("http://localhost:5001/message/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ message, receiverId }) 
  })
  .then(res => res.json())
  .then(data => {
    console.log("Message sent:", data);
    
    // Emit only if successful and message exists
    if (data && message) {    navigate('/login');

      socket.current.emit("send-message", {
        content: message,
        sender: id,
        receiver: receiverId,
        createdAt: new Date().toISOString()
      });
    }
  })
  .catch(err => console.error("Error sending message:", err));
};


  const handleUserClick = (userId) => {
      setSelectedUserId(userId);
    fetch(`http://localhost:5001/message/chats?otherId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to fetch messages:", err));
  };

  useEffect(() => {
    fetch("http://localhost:5001/message/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [token]); 

  return (
    <div className="main">
    {showPeople && (
      <div className="people">
        <h2 onClick={()=>setShowPeople(false)}>
        People
        </h2>
        <hr />
        <div className="users">
          {users.map((user) => (
            
            <div   className={`user-item ${selectedUserId === user._id ? 'selected' : ''}`} key={user._id}  onClick={()=>{
              handleUserClick(user._id);
              setreceiverId(user._id)
            }}><span role="img" aria-label="person">👤</span>{user.username}</div>
          ))}
        </div>
        <button className="logout" onClick={logout}>Logout</button>
         </div>
      
      )}
      
          <div className={`chat ${!showPeople ? "full" : ""}`}>
      {!showPeople && (
        <button className="toggle-button" onClick = {()=>setShowPeople(true)}>P</button>
        )}
      <div className="chatbox">

        <div className="message-container">
  {messages.map((msg, i) => {

  const trimmedId = id?.trim();
    return (
    <div
      key={i}
     className={`message ${String(msg.sender) === String(id) ? "sent" : "received"}`}

    >
      <p className="message-text">{msg.content}</p>
      <span className="timestamp">
        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>)
})}
</div>

      </div>
  <div className="send">
  <input
  type="text"
  id="sendtext"
  className="sendtext"
  placeholder="Type your message..."
  value={content}
  onChange={(e) => setContent(e.target.value)}
/>

<button
  className="sendbutton"
  onClick={() => {
    if (!content.trim()) return; 
      console.log("Sending message:", { receiverId, content });
    send(receiverId, content);
    setContent("");             
    console.log("LocalStorage id:", id);
    handleUserClick(receiverId);
  }}
>
  Send
</button>

</div>

      </div>

    </div>
  );
}
