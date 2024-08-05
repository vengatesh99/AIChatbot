"use client"

import { Box } from "@mui/material";
import ChatWindow from "@/components/ChatWindow";
import { useState } from "react";

const chatBoxStyle ={
  marginTop: "20px",
  marginLeft: "20px",
  marginBottom: "20px",
  borderColor: "rgba(0, 0, 0, 0.1)", // Light border color
  // borderColor: "#f5f5f7",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
  padding: "10px" // Padding for inner spacing
}
export default function Home() {
  const [messages,setMessages] = useState([
    {
      "role": "assistant",
      "content": "Hi, Welcome to our website. Ask me anything... I am here to help"
    }
  ])

  const handleSendMessage = async (newMessage) => {
    setMessages(prevMessage => [
      ...prevMessage,
      newMessage
    ] )

    //invoke the route that handles the POST request to OPEN AI
    const response = await fetch("api/chat", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages,newMessage])
    })
    const data = await response.json()
    setMessages((prevMessage)=>[
      ...prevMessage,
      {role:"assistant",content:data.message}
    ]) 


  }
  return (
    <Box display={"flex"}
    flexDirection={"row"}
    height={"100vh"}
    width={"100vw"}
    gap={2}
    // bgcolor={"#202123"}
    >
    <Box border={1}
    borderRadius={5}
    sx={chatBoxStyle}
    flexGrow={1}
    >New Chat option</Box>
    <Box
    border={1}
    borderRadius={5}
    sx={chatBoxStyle}
    flexGrow={4}
    flexShrink={1}
    mr={"20px"}
    >
      <ChatWindow messages = {messages} onSendMessage = {handleSendMessage}/>
    </Box>
    </Box>
  );
}
