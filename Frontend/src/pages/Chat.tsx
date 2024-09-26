import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import { BASEURL } from "./constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7C3AED",
    },
    background: {
      default: "#1E1E2D",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Work Sans, sans-serif",
  },
});

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  // Save chats to localStorage
  const saveChatsToLocalStorage = (messages: Message[]) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  // Retrieve chats from localStorage
  const loadChatsFromLocalStorage = () => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      return JSON.parse(storedMessages);
    }
    return [];
  };

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content, type: "text" };
    setChatMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      saveChatsToLocalStorage(updatedMessages);
      return updatedMessages;
    });

    try {
      const resp = await axios.post(
        `${BASEURL}v2/render`,
        {
          code: prompt,
          filename: "frontend.mp4",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.data.video_url) {
        const videoMessage = {
          role: "assistant",
          content: resp.data.video_url,
          type: "video",
        };
        setChatMessages((prev) => {
          const updatedMessages = [...prev, videoMessage];
          saveChatsToLocalStorage(updatedMessages);
          return updatedMessages;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteChats = () => {
    setChatMessages([]);
    localStorage.removeItem("chatMessages");
    toast.success("Deleted Chats Successfully", { id: "deletechats" });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  useLayoutEffect(() => {
    const storedMessages = loadChatsFromLocalStorage();
    if (storedMessages.length) {
      setChatMessages(storedMessages);
      toast.success("Loaded chats from local storage");
    } else {
      const initialMessages: Message[] = [
        {
          role: "assistant",
          content: "Hello! How can I assist you?",
          type: "text",
        },
      ];
      setChatMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          mt: 3,
          gap: 3,
          bgcolor: "background.default",
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "text.primary",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          EduVerse GPT
        </Typography>

        <Box sx={{ display: "flex", flex: 1, gap: 3 }}>
          <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "80vh",
                bgcolor: "#2C2C3D",
                borderRadius: 5,
                flexDirection: "column",
                mx: 3,
              }}
            >
              <Typography sx={{ mx: "auto", fontFamily: "Work Sans", mt: 3, color: "text.primary" }}>
                Chat with EduVerse GPT
              </Typography>
              <Typography sx={{ mx: "auto", fontFamily: "Work Sans", my: 4, p: 3, color: "text.primary" }}>
                Educational Animated Video Generator for Your Prompts.
              </Typography>
              <Button
                onClick={handleDeleteChats}
                sx={{
                  width: "200px",
                  my: "auto",
                  color: "text.primary",
                  fontWeight: "700",
                  borderRadius: 3,
                  mx: "auto",
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "#5B27A0" },
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
              height: "80vh",
              overflow: "hidden",
            }}
          >
            <Box
              ref={chatContainerRef}
              sx={{
                width: "100%",
                height: "calc(100% - 100px)",
                borderRadius: 3,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { width: "10px" },
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#7C3AED", borderRadius: "10px" },
                "&::-webkit-scrollbar-track": { backgroundColor: "#2C2C3D" },
              }}
            >
              {chatMessages.map((chat, index) => (
                <ChatItem
                  key={index}
                  content={chat.content}
                  role={chat.role}
                  sx={{
                    alignSelf: chat.role === "user" ? "flex-end" : "flex-start", // User on right, assistant on left
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 2, width: "100%" }}>
              <textarea
                ref={inputRef}
                placeholder="Type a message"
                onKeyDown={handleKeyDown}
                onChange={(e) => setPrompt(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #7C3AED",
                  backgroundColor: "#2C2C3D",
                  color: "#FFF",
                }}
              />
              <IconButton
                onClick={handleSubmit}
                sx={{ bgcolor: "#7C3AED", ":hover": { bgcolor: "#5B27A0" } }}
              >
                <IoMdSend color="#FFF" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
