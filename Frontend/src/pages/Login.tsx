import React from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.tsx";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Navigate to chat page even without authentication
    navigate("/chat");
  };

  return (
    <>
      <Header />
      <Box width={"100%"} height={"100%"} display="flex" flex={1}>
        <Box
          padding={8}
          mt={8}
          display={{ md: "flex", sm: "none", xs: "none" }}
        >
          <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
        </Box>
        <Box
          display={"flex"}
          flex={{ xs: 1, md: 0.5 }}
          justifyContent={"center"}
          alignItems={"center"}
          padding={2}
          ml={"auto"}
          mt={16}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              margin: "auto",
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                padding={2}
                fontWeight={600}
              >
                Login
              </Typography>

              {/* Email Label */}
              <Typography
                sx={{ 
                  marginBottom: "8px", 
                  fontWeight: "bold",
                  fontSize: "16px" 
                }}
              >
                Email
              </Typography>
              <CustomizedInput type="email" name="email" />

              {/* Password Label */}
              <Typography
                sx={{ 
                  marginTop: "16px", 
                  marginBottom: "8px", 
                  fontWeight: "bold",
                  fontSize: "16px" 
                }}
              >
                Password
              </Typography>
              <CustomizedInput type="password" name="password" />

              <Button
                type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  width: "400px",
                  borderRadius: 2,
                  bgcolor: "#00fffc",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                endIcon={<IoIosLogIn />}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
