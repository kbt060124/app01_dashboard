import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import logo from "./logo.svg";
import "../../App.css";
import { tokens } from "../../theme";
import { baseUrl } from "../../hooks";


export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [apiResponse, setApiResponse] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const generatePassword = () => {
        const length = 12;
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    const handleGeneratePassword = () => {
        setPassword(generatePassword());
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(baseUrl + "/api/register.php", {
                username: username,
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response);
                setApiResponse(response.data.message);
            })
            .catch((error) => {
                console.error(error);
                setApiResponse(error.response.data.message);
            });
    };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }} className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Clete By React With PHP.</p>
                </header>
            </div>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5%",
                }}
            >
                <Container maxWidth="sm">
                    <form onSubmit={handleSubmit}>
                        <Typography
                            style={{ marginBottom: "20px" }}
                            variant="h2"
                            component="h2"
                        >
                            Sign up
                        </Typography>
                        {apiResponse && (
                            <Alert
                                style={{ marginBottom: "20px" }}
                                severity={
                                    apiResponse.includes("success")
                                        ? "success"
                                        : "error"
                                }
                            >
                                {apiResponse}
                            </Alert>
                        )}
                        <TextField
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            variant="filled"
                            id="filled-basic"
                            label="Username"
                            fullWidth
                            style={{ marginBottom: "20px" }}
                        />
                        <TextField
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            variant="filled"
                            id="filled-basic"
                            label="Email address"
                            fullWidth
                            style={{ marginBottom: "20px" }}
                        />
                        <div>
                            <TextField
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                variant="filled"
                                id="filled-basic"
                                label="Password"
                                fullWidth
                                style={{ marginBottom: "10px" }}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={handleShowPassword}
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button
                                size="small"
                                style={{ marginBottom: "25px" }}
                                onClick={handleGeneratePassword}
                            >
                                Generate password
                            </Button>
                        </div>
                        <Button
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Sign up
                        </Button>
                        <Typography
                            variant="body1"
                            gutterBottom
                            style={{ marginTop: "20px" }}
                        >
                            Do You have an account?{" "}
                            <Link color="#0067C0" href="/login">
                                Sign in
                            </Link>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </div>
    );
};
