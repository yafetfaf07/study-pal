import { Button } from "./ui/button";
import { Link } from "react-router";
interface DashboardCardProps {
  names:string
  role:string,
  description:string
  id:string
}
const DashBoardCard:React.FC<DashboardCardProps> = ({names,role,description,id}) => {

  return (
    <Link to={`/groups/${id}`}>
    <div className="bg-white w-[93%] p-5 rounded-lg m-2 md:w-[400px] shadow-2xl md:ml-10 md:mt-10 ">
      <div className="flex justify-between items-center p-1">
        <h2 className="font-bold text-2xl">{names}</h2>
        <div className="bg-green-100 rounded-4xl w-14 border-1 border-green-20 flex items-center justify-center">
          <span className="text-green-700 text-[12px] font-medium">active</span>
        </div>
      </div>
      <p className="p-1 text-gray-400">{description}</p>
      <p className="p-1">25 Members</p>
      <div className="flex item-center justify-between p-1">
        <div className="flex flex-col">
          <span className="font-semibold">Role: {role}</span>
          <span className="text-gray-400">Joined 2023-12-01</span>
        </div>
        <span>⭐️⭐️⭐️</span>
      </div>
      <Button className="bg-black text-white border-1 w-[100%] mt-2 cursor-pointer" onClick={() => {
      }}>
        View Group
      </Button>
    </div>
    </Link>
  );
};

export default DashBoardCard;
