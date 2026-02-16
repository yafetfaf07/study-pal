import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge"
const RankingComponent = () => {
  return (
    <div className="w-[95%] md:w-[30%] flex flex-col items-center justify-center bg-[#fffbea] p-2 border-1 border-amber-200 rounded-lg">
      <Crown className="text-[#f59e0b]" />
      <div className="bg-gray-200 w-[70px] h-[70px] rounded-full flex items-center justify-center m-2">
        <span className="font-bold text-2xl">NG</span>
      </div>
      <h2 className="font-bold text-2xl m-2">Nathan Getachew</h2>
      <Badge variant={"outline"}>Admin</Badge>
      <h2 className="font-bold text-2xl text-[#d97706] m-2">256</h2>
      <span className="text-gray-500 mb-2">Total Points</span>
    </div>
  );
};

export default RankingComponent;
