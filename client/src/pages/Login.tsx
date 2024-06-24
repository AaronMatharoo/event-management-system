import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useAuth } from "components/AuthProvider";

const Login = () => {
  //manage loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  //access setToken from custom AuthProvider
  const { setToken } = useAuth();
  const navigate = useNavigate();

  //form validation and error handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle login submission
  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      //POST to login endpoint
      const response = await fetch("http://localhost:1337/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      //if successful, set token and navigate to /events
      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        setIsLoading(false);
        navigate("/Events");
      } else {
        // handle login failure
        setError(true);
        setIsLoading(false);
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      // handle login failure
      setError(true);
      setIsLoading(false);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen bg-purple-100">
      <div className="bg-purple-100 h-screen flex flex-col">
        <div className="flex flex-col justify-center items-center h-1/4">
          <p
            className="font-light text-5xl underline text-center"
            style={{ textDecorationColor: "#5d00d7" }}
          >
            Log in to your account
          </p>
        </div>

        {/* login form  */}
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="grid grid-flow-row justify-center gap-6"
        >
          <div className="max-w-min">
            <h1 className="font-semibold text-xl py-2">Username</h1>
            <input
              type="text"
              placeholder="Enter your username"
              className="p-3 text-lg rounded-md"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <div className="max-w-max pt-2">
                <p className="text-red-500 font-light">
                  {errors.username.message}
                </p>
              </div>
            )}
          </div>
          <div className="max-w-min">
            <h1 className="font-semibold text-xl py-2">Password</h1>
            <input
              type="password"
              placeholder="Enter your password"
              className="p-3 text-lg rounded-md max-w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <div className="max-w-max pt-2">
                <p className="text-red-500 font-light">
                  {errors.password.message}
                </p>
              </div>
            )}
          </div>

          {/* submit button */}
          <div>
            <button
              type="submit"
              className="bg-purple-700 py-3 w-full rounded-md hover:bg-purple-500 text-center flex items-center justify-center"
            >
              {isLoading ? (
                <PulseLoader color="rgba(255, 255, 255, 1)" />
              ) : (
                <p className="text-xl text-white">Log In!</p>
              )}
            </button>
          </div>
        </form>

        {/* potential error messages */}
        <div className="flex justify-center">
          {error && (
            <p className="font-bold text-red-600 pt-10">
              Login failed. Please check your username and password and try
              again.
            </p>
          )}
        </div>
        <div className="flex justify-center pt-6">
          <p>
            Don't have an account?{" "}
            <Link to="/Register" className="underline text-blue-600">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
