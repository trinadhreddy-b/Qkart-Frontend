import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [inputVal,setInputVal]=useState({
    username: "",
    password: "",
    confirmPassword: ""

  });

  const [isLoading,loadingStatus]=useState(false);

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    if(validateInput(formData)){
      loadingStatus(true);
    const url=config.endpoint+"/auth/register"
    const postData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      
      const res = await axios.post(url, postData);
      console.log(res.status);
      if (res.status === 201) {
        enqueueSnackbar("Registered successfully", { variant: "success" });
        loadingStatus(false);
        // history.push("/login", { from: "Register" });
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Username is already taken", { variant: "error" });
        loadingStatus(false);
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
        loadingStatus(false);
      }

    }
  }
    
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if(data.username==="")
    {
      enqueueSnackbar("Username is a required field", {variant:"warning"});
      return false;
    }
    if(data.username.length<6){
    enqueueSnackbar("Username must be at least 6 characters", {variant:"warning"});
    return false;
    }
    if(data.password===""){
    enqueueSnackbar("Password is a required field", {variant:"warning"});
    return false;
    }
    if(data.password.length<6){
    enqueueSnackbar("Password must be at least 6 characters", {variant:"warning"});
    return false;
    }
    if(data.password!==data.confirmPassword){
    enqueueSnackbar("Passwords do not match", {variant:"warning"});
    return false;
    }

    return true;

  };

  const handleOnChange=(e)=>{
    setInputVal({
      ...inputVal,
      [e.target.name]:e.target.value
      
    })

  }
  const clickHandler=()=>{
    register(inputVal);
    
  }


  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={handleOnChange}
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            onChange={handleOnChange}
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            onChange={handleOnChange}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
          />
            {isLoading ?
            (<div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
            </div>)
            :(
           <Button className="button" variant="contained" onClick={clickHandler}>Register Now</Button>
           )}
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
