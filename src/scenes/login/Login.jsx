import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import logo from "./logo.svg"
import "../../App.css";
import { tokens } from "../../theme";
import { baseUrl } from "../../hooks";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(baseUrl + "/api/login.php", {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response);
                if (response.data.status === "success") {
                    sessionStorage.setItem("loggedIn", true);
                    sessionStorage.setItem(
                        "userData",
                        JSON.stringify(response.data.data)
                    );
                    console.log(response.data.data);

                    window.location.href = "/dashboard";
                } else {
                    setError(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div style={{display:"flex"}}>
            <div style={{width:"50%"}} className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Clete By React With PHP.
                    </p>
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
                            Sign in
                        </Typography>
                        {error && (
                            <Alert
                                style={{ marginBottom: "20px" }}
                                severity="error"
                            >
                                {error}
                            </Alert>
                        )}
                        <TextField
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            variant="filled"
                            id="email"
                            label="Email address"
                            fullWidth
                            style={{ marginBottom: "20px" }}
                        />
                        <TextField
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            variant="filled"
                            id="password"
                            label="Password"
                            fullWidth
                            style={{ marginBottom: "20px" }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={handleShowPassword}>
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
                            Login
                        </Button>
                        <p>
                            Don't have an account?{" "}
                            <Link color="#0067C0" href="/register">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </Container>
            </Box>
        </div>
    );
};
