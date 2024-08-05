import { Stack, TextField, Button, Box } from "@mui/material";
import { useRef, React } from "react";

const ChatWindow = ({ messages, onSendMessage }) => {
    const sendMsgRef = useRef()
    // const sendButtonRef = useRef()
  return (
    <Stack direction={"column"} spacing={2} flexGrow={2}>
      {messages.map((message, index) => (
        <Box
          key={index}
          display="flex"
          justifyContent={
            message.role === "assistant" ? "flex-start" : "flex-end"
          }
        >
          <Box
            bgcolor={
              message.role === "assistant" ? "primary.main" : "secondary.main"
            }
            color={"white"}
            borderRadius={16}
            p={2}
          >
            {message.content}
          </Box>
        </Box>
      ))}
      <Stack direction={"row"} spacing={2}>
        <TextField inputRef = {sendMsgRef} label="Chat with AI" fullWidth></TextField>
        <Button variant="contained" onClick={()=>{
            const newMsg = {
                role : "user",
                content : sendMsgRef.current.value
            }
            sendMsgRef.current.value = ''
            onSendMessage(newMsg)
            }}> Send </Button>
      </Stack>
    </Stack>
  );
};

export default ChatWindow;
