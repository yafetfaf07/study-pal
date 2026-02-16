import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { supabase } from "@/utils/supabase";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { CheckCircle, XCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccessful) {
      toast.success("Login successful! Redirecting to dashboard...");
      // Delay navigation to allow the toast to be visible
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000); // 2-second delay
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isSuccessful, navigate]);

  useEffect(() => {
    if (isError) {
      toast("Login failed. Please check your credentials.");
    }
  }, [isError]);

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      setIsError(true);
      return;
    }

    if (data.session) {
      console.log("User Info: ", data);
      localStorage.setItem("accessToken", data.session.access_token);
      localStorage.setItem("refreshToken", data.session.refresh_token);
      setIsSuccessful(true); // Trigger success state
    }
  };

  return (
    <div>
      <Toaster
        position="top-center"
        richColors
        icons={{
          success: <CheckCircle className="h-5 w-5 text-green-500" />,
          error: <XCircle className="h-5 w-5 text-red-500" />,
        }}
      />
      <div className="flex flex-col mb-5">
        <span className="pb-2 font-bold">Email</span>
        <input
          className="border-1 rounded-sm border-gray-300 p-2"
          type="text"
          placeholder="Nate123"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col mb-5">
        <span className="pb-2 font-bold">Password</span>
        <input
          className="border-1 rounded-sm border-gray-300 p-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center">
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-400 w-40"
          onClick={login}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;