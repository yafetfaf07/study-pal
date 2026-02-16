import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const InvitedDashboardCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-[93%] p-5 rounded-lg m-2 md:w-[550px] shadow-2xl">
      <div className="flex justify-between items-center p-1">
        <h2 className="font-bold text-2xl">React Masters</h2>
        <div className="bg-orange-100 rounded-4xl w-14 border-1 border-green-20 flex items-center justify-center">
          <span className="text-orange-700 text-[12px] font-medium">
            invited
          </span>
        </div>
      </div>
      <p className="p-1 text-gray-400">Advanced React development group</p>
      <p className="p-1">12 members</p>
      <div className="flex item-center justify-between p-1">
        <div className="flex flex-col">
          <span className="font-semibold">Invited by:John Doe</span>
          <span className="text-gray-400">Due 2023-12-01</span>
        </div>
      </div>
      <div className="flex">
        <Button
          className="bg-green-700 text-white border-1 mt-2 w-[50%] cursor-pointer"
          onClick={() => {
            navigate("/groups");
          }}
        >
          Accept
        </Button>
        <Button
          className="bg-red-500 text-white border-1 w-[50%] mt-2 cursor-pointer"
          onClick={() => {
            navigate("/groups");
          }}
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default InvitedDashboardCard;
