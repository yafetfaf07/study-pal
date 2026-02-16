// import RankingComponent from "@/components/RankingComponent"
import { supabase } from "@/utils/supabase"
import {  ChevronLeft, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// interface LeaderBoardData {
//   uid:any;
//   total_points:any;
//   user:{
//     name:any;
//     email:any;
//     uid:any;
//   }
// }
const LeaderBoard = () => {
  const {id} = useParams<{id:string}>();
  const [leaderBoardData, setleaderBoardData] = useState<any[]>([]);
useEffect(() => {
const fetchPointData = async() => {
const { data, error } = await supabase
  .from("point")
  .select("uid, total_points, user!inner(name, email, uid)")
  .eq("gid", id)
  .order("total_points", { ascending: false });
  if(error) {
    console.error("Error happened in leaderBoard: ", error);
    return
  }
    console.log("Data from leaderboard: ", data);
    setleaderBoardData(data);
}
fetchPointData();
},[])
  return (
    <div>
      <div className=" bg-gray-300 w-[40px] h-[40px] rounded-full flex items-center justify-center "><ChevronLeft/> </div>
      <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center flex-col bg-[#fffbea] w-[80%] p-5 rounded-lg border-2 border-amber-400">
        <div className="flex items-center">
          <Trophy className="text-[#f59e0b]" scale={10} size={36}/> 
          <h2 className="text-4xl font-semibold">Group LeaderBoard </h2>
          <Trophy className="text-[#f59e0b]" size={36}/>
        </div>
        <h2>Javascript Ninjas- Competition Rankings</h2>
      </div>
      <div className="w-[80%] md:w-[670px] mt-5 flex justify-center items-center">
<Table className="">
  <TableCaption>A list of users</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Id</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className="text-right">Points</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      leaderBoardData.map((d,i) => {
        return   <TableRow>
      <TableCell className="font-medium">{i+1}</TableCell>
      <TableCell>{d['user']['name']}</TableCell>
      <TableCell>{d['user']['email']}</TableCell>
      <TableCell className="text-right">{d['total_points']}</TableCell>
    </TableRow>
      })
    }
  
  </TableBody>
</Table>
      {/* <RankingComponent/>
      <RankingComponent/>
      <RankingComponent/> */}

      </div>
      </div>
   
    </div>
  )
}

export default LeaderBoard