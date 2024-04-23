import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import LoginLoader from "../../components/loaders/LoginLoader.jsx";
import {
    Box,
    Button, FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    Typography, useFormControl
} from "@mui/material";
import axios from "axios";
import {ACCESS_TOKEN, LOGIN_URL, MY_PERMISSIONS, PRIMARY_COLOR} from "../../utils/constants.js";
import "./Login.css";

import logo from "../../assets/logo.png"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {isLoggedInVar, userPermissions} from "../../store/cache.js";
import {showToastTop} from "../../utils/helpers.js";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {encryptLocalStorageData} from "../../utils/crypto.js";

const loginUrl = LOGIN_URL;

const Login = () => {

    const location = useLocation();
    let from = location.state?.from?.pathname || "/dashboard";

    const [showPassword, setShowPassword] = useState(false);


    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (isLoggedInVar()) {
            navigate(from, { replace: true });
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await axios.post(loginUrl, {
                ...data,
            });

            console.log(result)


            if (result.status === 200) {
                setLoading(false);

                // localStorage.setItem(
                //     ACCESS_TOKEN,
                //     JSON.stringify(result.data.access_token)
                // );

                encryptLocalStorageData(ACCESS_TOKEN, result.data.access_token)

                isLoggedInVar(true);

                // localStorage.setItem(
                //     MY_PERMISSIONS,
                //     JSON.stringify(result.data.permissions)
                // );

                encryptLocalStorageData(MY_PERMISSIONS, result.data.permissions)

                userPermissions(result.data.permissions);

                // Navigate User to dashboard
                // The use of navigate("...", { replace: true }) to replace the /login route in the history stack so the user doesn't return to the login page when clicking the back button after logging in

                navigate(from, { replace: true });
                //navigate("/dashboard");
            }
        } catch (error) {

            console.log(error);

            setLoading(false);

            if (
                error.response.request.status &&
                error.response.request.status === 401
            ) {
                showToastTop(`Wrong credentials`);
            } else {
                showToastTop(`${error.message}`);
            }
        }
    }

    function PasswordHelperText() {
        const { focused } = useFormControl() || {};

        const helperText = React.useMemo(() => {
            if (focused) {
                return errors.password?.message;
            }

            return '';
        }, [focused]);

        return <FormHelperText>{helperText}</FormHelperText>;
    }



    return <LoginLoader loading={loading}>
        <div className="login-box">
            <>
                <Paper
                    sx={{
                        width: 480, height: 600, borderRadius: "0.8rem",
                        paddingTop: 5
                    }}
                    elevation={12}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        marginTop: 10,
                                        width: 100,
                                    }}
                                />
                            </>
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{
                                    marginY: 1,
                                }}
                            >
                                WeCover
                            </Typography>

                            <Box
                                sx={{
                                    padding: "0 20px",
                                }}
                            >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    {...register("email", { required: "Email is required." })}
                                    error={Boolean(errors.email)}
                                    focused={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />

                                <FormControl error={Boolean(errors.password)} focused={Boolean(errors.password)}  margin="normal" fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password", {
                                            required: "Password is required.",
                                        })}

                                        helperText={errors.password?.message}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    <PasswordHelperText />
                                </FormControl>

                            </Box>
                        </div>

                        <Box
                            sx={{
                                display: "flex",
                                padding: "0 20px",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginY: 2,
                            }}
                        >
                            <Button
                                type="submit"
                                size="large"
                                sx={{width: "100%", backgroundColor: PRIMARY_COLOR}}
                                variant="contained"
                            >
                                Login
                            </Button>

                        </Box>

                        <Typography
                            sx={{
                                padding: "0 20px",
                                mt: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Link to="#" onClick={() => null}>
                                Forgot Your Password?
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </>
        </div>
    </LoginLoader>
}
export default Login
