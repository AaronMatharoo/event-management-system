import LinkButton from "components/LinkButton";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="bg-purple-100 h-screen flex flex-col p-5">
      {/* header / overview section */}
      <div className="flex flex-col space-y-6 justify-center items-center h-1/3">
        <p
          className="font-light text-3xl md:text-5xl underline"
          style={{ textDecorationColor: "#5d00d7" }}
        >
          Events Management App
        </p>
        <p className="font-bold text-xl md:text-3xl text-center">
          Create, View, and Register For Events
        </p>
      </div>

      {/* main content */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full md:w-1/2 rounded-md p-5 space-y-10">
          <p className="text-2xl md:text-5xl font-semibold text-center">
            Get started now
          </p>
          {/* resuable buttons to login / register */}
          <LinkButton text="Register" to="/Register" />
          <LinkButton text="Login" to="/Login" />
        </div>
      </div>
    </div>
  );
};

export default Home;
