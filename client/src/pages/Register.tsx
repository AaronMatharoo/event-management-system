import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const Register = () => {
  //handle loading, error, and users status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userExists, setUserExists] = useState(false);

  //handle navigation
  const navigate = useNavigate();

  //form state and validation handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle registration form submission
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      //POST request to registration endpoint
      const response = await fetch("http://localhost:1337/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //if successful, navigate to login screen
      if (response.ok) {
        setIsLoading(false);
        navigate("/Login");
      } else {
        //handle case where user already exists
        setError(false);
        setUserExists(true);
        setIsLoading(false);
        console.error("User already exists", response.statusText);
      }
    } catch (error) {
      //handle registration failure
      setUserExists(false);
      setIsLoading(false);
      setError(true);
      console.error("Registration failed:", error);
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
            Register for an account
          </p>
        </div>

        {/* registration form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-flow-row justify-center gap-6"
        >
          <div className="max-w-min">
            <h1 className="font-semibold text-xl py-2">Username</h1>
            <input
              type={"text"}
              placeholder={"Enter a username"}
              className="p-3 text-lg rounded-md "
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters long",
                },
              })}
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
              type={"password"}
              placeholder={"Enter a password"}
              className="p-3 text-lg rounded-md max-w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
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
                <p className="text-xl text-white">Register!</p>
              )}
            </button>
          </div>
        </form>

        {/* potential error messages */}
        <div className="flex justify-center">
          {userExists && (
            <p className="font-bold text-red-600 pt-10 text-center px-5">
              That username already exists, please{" "}
              <Link to="/Login" className="underline text-blue-600">
                log in here
              </Link>{" "}
              or register with a different name.
            </p>
          )}
          {error && (
            <p className="font-bold text-red-600 pt-10 text-center px-5">
              Registration failed. Please make sure the server is running and
              try again later.
            </p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Register;
