import  { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import starLogo from "../assets/Pasted image.png";
const SignUpPage = () => {
  const [isSign, setisSign] = useState<boolean>(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className=" bg-purple-50 p-10 rounded-lg md:w-[600px]">
    <div>
      <div className="flex items-center justify-between pl-2 pr-2">
        {isSign ? (
          <h2 className="text-2xl font-bold ">Join the Adventure</h2>
        ) : (
          <h2 className="text-2xl font-bold">Welcome Back!</h2>
        )}
        <img src={starLogo} alt="" className="w-[40px]" />
      </div>
    </div>

    <div className="flex mt-5 mb-5">
      {isSign ? (
        <div className="flex justify-between w-full">
          <button
            className="bg-gray-200 p-2 w-full rounded-l-sm"
            onClick={() => setisSign(false)}
          >
            Login
          </button>
          <button
            className="bg-blue-200 p-2 w-full rounded-r-sm text-black"
            onClick={() => setisSign(true)}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <button
            className="bg-blue-200 p-2 w-full rounded-l-sm"
            onClick={() => setisSign(false)}
          >
            Login
          </button>
          <button
            className="bg-gray-200 p-2 w-full rounded-r-sm text-black"
            onClick={() => setisSign(true)}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>

    {isSign ? <SignUp /> : <Login />}
  </div>
</div>

  );
};

export default SignUpPage;
