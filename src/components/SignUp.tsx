import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/utils/supabase";
import { Toaster } from "@/components/ui/sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner"

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate("/dashboard");
    }
  }, [navigate, accessToken, refreshToken]);

  const signup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if(error.message=="User already registered") {
   console.error("Signup error:", error.message);
      toast.error("Signup failed. User already exists", {
        duration: 5000,
      })
      }
      else if(error.message=="Signup requires a valid password") {
   console.error("Signup error:", error.message);
      toast.error("Signup requires a valid password", {
        duration: 5000,
      })
      }
   ;
      return;
    }

    if (data.user) {
      console.log("User ID:", data.user.id);
      const uid = data.user.id;
      toast.success("Registered Successfully now login to your account", {
        duration:5000
      })
     

      const { data: insertedData, error: insertError } = await supabase
        .from("user")
        .insert({ name, email, uid });

      if (insertError) {
        console.error("Insert error:", insertError);
        toast.error("Failed to save user data. Please try again.", {
          duration: 5000,
        });
        return;
      }

      if (insertedData) {
        console.log("Data saved successfully inside");
        toast.success("Account created successfully! Redirecting to dashboard...", {
          duration: 5000,
        });
        // Delay navigation to allow toast to be visible
          // navigate("/dashboard");
      
      }
    }
  };

  return (
    <div className=" ">
      <Toaster
        position="top-center"
        richColors
        icons={{
          success: <CheckCircle className="h-5 w-5 text-green-500" />,
          error: <XCircle className="h-5 w-5 text-red-500" />,
        }}
      />
      <div className="flex flex-col mb-5">
        <span className="font-bold">Name</span>
        <input
          className="border-1 rounded-sm border-gray-300 p-2"
          type="text"
          placeholder="John Doe"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-5">
        <span className="font-bold">Email</span>
        <input
          className="border-1 rounded-sm border-gray-300 p-2"
          type="email"
          placeholder="Natyy@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-5">
        <span className="pb-2 font-bold">Password</span>
        <input
          className="border-1 rounded-sm border-gray-300 p-2"
          type="password"
          placeholder="Nate123"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-lg p-3 font-bold md:w-[400px]"
          onClick={signup}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignUp;