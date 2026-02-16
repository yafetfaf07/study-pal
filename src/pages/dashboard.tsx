import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/utils/supabase";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "@/components/ui/sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import DashBoardCard from "@/components/DashBoardCard";
import DashboardNotify from "@/components/DashboardNotify";
import createGroup from "@/services/groupCreate";

// Define the type for the Supabase JWT payload
type SupabaseToken = {
  sub: string; // The user ID
  exp: number;
  iat: number;
};

// Define the type for the data returned from the Supabase query
type UserGroups = {
  role: string;
  group: {
    id: string;
    name: string;
    description: string;
  };
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const [gname, setGname] = useState<string>("");
  const [gdesc, setGdesc] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gdata, setGdata] = useState<boolean>(true);
  const [groups, setGroups] = useState<UserGroups[]>([]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error: ", error);
      toast.error("Failed to sign out. Please try again.", {
        duration: 5000,
      });
    } else {
      localStorage.clear();
      navigate("/");
      toast.success("Successfully signed out!", {
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    async function getUserId() {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found.");
        toast.error("No authentication token found. Please sign in.", {
          duration: 5000,
        });
        navigate("/");
        return;
      }

      const decoded: SupabaseToken = jwtDecode(token);
      const { data: userData, error: userError } = await supabase
        .from("user")
        .select("id, name")
        .eq("uid", decoded.sub)
        .single();

      if (userError || !userData) {
        console.error("User ID fetching failed or user not found:", userError);
        toast.error("Failed to fetch user data. Please sign in again.", {
          duration: 5000,
        });
        navigate("/");
        return;
      }

      setUid(userData.id);
      setName(userData.name);

      const { data: userGroups, error: groupError } = await supabase
        .from("usergroup")
        .select(
          `
            role,
            group:group!inner(id, name, description)
          `
        )
        .eq("uid", userData.id);

      if (groupError) {
        console.error("Error fetching groups with roles:", groupError);
        toast.error("Failed to load groups. Please try again.", {
          duration: 5000,
        });
      } else if (userGroups) {
        console.log("Groups with roles for user:", userGroups);
        setGroups(userGroups as unknown as UserGroups[]);
        setGdata(false);
      }
    }
    getUserId();
  }, [navigate]);

  const handleCreateGroup = async () => {
    try {
      await createGroup(gname, gdesc, uid);
      toast.success(`Group "${gname}" created successfully!`, {
        duration: 5000,
      });
      // Refresh groups after creation
      const { data: userGroups, error: groupError } = await supabase
        .from("usergroup")
        .select(
          `
            role,
            group:group!inner(id, name, description)
          `
        )
        .eq("uid", uid);
      if (groupError) {
        console.error("Error fetching updated groups:", groupError);
        toast.error("Failed to refresh groups. Please try again.", {
          duration: 5000,
        });
      } else if (userGroups) {
        setGroups(userGroups as unknown as UserGroups[]);
      }
      setGname("");
      setGdesc("");
    } catch (error) {
      console.error("Group creation failed:", error);
      toast.error("Failed to create group. Please try again.", {
        duration: 5000,
      });
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
      <div className="flex justify-between m-3">
        <h2 className="pl-2 pt-1 text-3xl font-bold md:pt-3 md:pl-3">
          Hello, {name}
        </h2>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between p-2">
        <span className="pb-2 text-2xl font-normal">
          Manage your groups and collaborations
        </span>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-gradient-to-r from-violet-500 to-indigo-400 m-2 w-[93%] md:w-30">
              + Create group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Group Information</DialogTitle>
              <DialogDescription>
                <span className="pt-2">Name</span>
                <Input
                  className="mb-2"
                  onChange={(e) => setGname(e.target.value)}
                  value={gname}
                />
                <span className="">Description</span>
                <Input
                  className="mt-2"
                  onChange={(e) => setGdesc(e.target.value)}
                  value={gdesc}
                />
                <Button
                  className="bg-gradient-to-r from-violet-500 to-indigo-400 mt-2 w-[93%] md:w-30"
                  onClick={handleCreateGroup}
                >
                  Create group
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col items-center justify-around md:flex-row">
        <DashboardNotify no={groups.length} />
      </div>
      <h2 className="text-center text-2xl font-semibold m-5">My Groups</h2>
      <div className="flex flex-col items-center justify-center md:flex-row flex-wrap md:justify-normal">
        {gdata ? (
          // Render multiple skeletons to mimic DashBoardCard layout
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-[93%] md:w-[400px] h-[200px] m-2 rounded-lg bg-gray-200"
              />
            ))
        ) : groups.length > 0 ? (
          groups.map((d) => (
            <DashBoardCard
              id={d.group.id}
              key={d.group.id}
              names={d.group.name}
              role={d.role}
              description={d.group.description}
            />
          ))
        ) : (
          <p className="text-center text-lg mt-10">No groups found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;