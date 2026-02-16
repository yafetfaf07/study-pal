import { Button } from "./ui/button";

const UpcomingQuizCard = () => {
  return (
    <div className="bg-white border-2  p-4 mt-4 rounded-lg">
      <div className="flex justify-between mt-2 mb-4">
        <h2 className="font-semibold">DOM Manipulation</h2>
        <div className="bg-orange-100 rounded-4xl w-14 border-1 border-green-20 flex items-center justify-center">
          <span className="text-orange-700 text-[12px] font-medium">medium</span>
        </div>
      </div>
      <span className="mt-5">Working with the Document Object Model</span>
      <div className="flex justify-between mt-2">
        <span>2:00</span>
        <span>20 Questions</span>
      </div>
      <div className="flex flex-col justify-between mt-4">
    <span className="text-blue-400 font-semibold text-center">Available:2024-01-20</span>
    <Button className="bg-black text-white rounded-lg w-[100%] opacity-35">Locked</Button>
      </div>
    </div>
  );
};

export default UpcomingQuizCard;
