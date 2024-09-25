import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
  type: "text" | "video"; // Distinguish between text and video messages
};

// Define theme with #7C3AED as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#7C3AED", // Set primary color
    },
    background: {
      default: "#1E1E2D", // Background for the entire app
    },
    text: {
      primary: "#FFFFFF", // White for primary text color
    },
  },
  typography: {
    fontFamily: "Work Sans, sans-serif", // Global font family
  },
});

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content, type: "text" };
    setChatMessages((prev) => [...prev, newMessage]);

    // Show video message if input is "arjun"
    if (content.toLowerCase() === "arjun") {
      const videoMessage: Message = {
        role: "assistant",
        content: "https://myawsstestings3.s3.eu-north-1.amazonaws.com/Video+Files/1+h.mp4",
        type: "video",
      };
      setChatMessages((prev) => [...prev, videoMessage]);
    } else {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    toast.loading("Loading Chats", { id: "loadchats" });
    getUserChats()
      .then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully loaded chats", { id: "loadchats" });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Loading Failed", { id: "loadchats" });
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Move EduVerse GPT to the top
          width: "100%",
          height: "100vh", // Full height for the chatbox
          mt: 3,
          gap: 3,
          bgcolor: "background.default", // Apply theme background color
        }}
      >
        {/* EduVerse GPT heading at the top */}
        <Typography
          sx={{
            fontSize: "40px",
            color: "text.primary", // Use theme text color
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          EduVerse GPT
        </Typography>

        <Box
          sx={{
            display: "flex",
            flex: 1, // Take up all available space
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: { md: "flex", xs: "none", sm: "none" },
              flex: 0.2,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "80vh", // Match height with chatbox
                bgcolor: "#2C2C3D", // Dark background for the side panel
                borderRadius: 5,
                flexDirection: "column",
                mx: 3,
              }}
            >
              <Typography
                sx={{
                  mx: "auto",
                  fontFamily: "Work Sans",
                  mt: 3,
                  color: "text.primary",
                }}
              >
                Chat with EduVerse GPT
              </Typography>
              <Typography
                sx={{
                  mx: "auto",
                  fontFamily: "Work Sans",
                  my: 4,
                  p: 3,
                  color: "text.primary",
                }}
              >
                Ask questions related to Knowledge, Business, Advice, Education, etc. Avoid sharing personal information.
              </Typography>
              <Button
                onClick={handleDeleteChats}
                sx={{
                  width: "200px",
                  my: "auto",
                  color: "text.primary", // Text color using theme
                  fontWeight: "700",
                  borderRadius: 3,
                  mx: "auto",
                  bgcolor: "primary.main", // Primary color from theme
                  ":hover": {
                    bgcolor: "#5B27A0", // Darker shade for hover
                  },
                }}
              >
                Clear Conversation
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flex: { md: 0.8, xs: 1, sm: 1 },
              flexDirection: "column",
              px: 3,
              height: "80vh", // Chat and video height
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "calc(100% - 100px)", // Adjust height to fit within container
                borderRadius: 3,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto", // Enable scrolling for long chat
                scrollBehavior: "smooth",
              }}
            >
              {chatMessages.map((chat, index) =>
                chat.type === "video" ? (
                  <video
                    key={index}
                    controls
                    style={{
                      width: "100%",
                      maxHeight: "calc(100% - 20px)", // Scale video to fit
                      objectFit: "contain", // Contain within bounds
                    }}
                  >
                    <source src={chat.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <ChatItem
                    content={chat.content}
                    role={chat.role}
                    key={index}
                    sx={{
                      backgroundColor: chat.role === "user" ? "primary.main" : "#5B27A0", // Violet theme for response
                      borderRadius: 2,
                      padding: "10px",
                      margin: "10px 0",
                      maxWidth: "80%", // Limit width for better readability
                      alignSelf: chat.role === "user" ? "flex-end" : "flex-start", // Align user and assistant messages differently
                    }}
                  />
                )
              )}
            </Box>
            <div
              style={{
                width: "100%",
                borderRadius: 20, // Increased border radius for a softer look
                backgroundColor: "#2C2C3D", // Set a darker background for the input area
                display: "flex",
                margin: "auto",
                marginTop: 10,
                padding: "10px 20px", // Add padding for spacing
                border: "1px solid #7C3AED", // Border color
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  padding: "15px 20px", // Adjust padding for better spacing
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "16px", // Adjusted font size
                  borderRadius: 10, // Round input corners
                }}
              />
              <IconButton
                onClick={handleSubmit}
                sx={{
                  color: "primary.main", // Use theme primary color
                  mx: 1,
                }}
              >
                <IoMdSend />
              </IconButton>
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
