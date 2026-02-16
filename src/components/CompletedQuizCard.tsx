import { Button } from "./ui/button";

const CompletedQuizCard = () => {
  return (
    <div className="bg-white border-2 border-green-300 p-4 mt-4 rounded-lg">
      <div className="flex justify-between mt-2 mb-4">
        <h2 className="font-semibold">Javascript Fundamentals</h2>
        <div className="bg-green-100 rounded-4xl w-14 border-1 border-green-20 flex items-center justify-center">
          <span className="text-green-700 text-[12px] font-medium">Easy</span>
        </div>
      </div>
      <span className="mt-5">Working with the Document Object Model</span>
      <div className="flex justify-between mt-2">
        <span className="text-green-600 font-bold text-2xl">18/20</span>
        <span>⭐️⭐️⭐️</span>
      </div>
      <div className="flex flex-col justify-between mt-4">
    <span className="text-gray-400 font-semibold">Completed:2024-01-20</span>
        <span className="text-gray-400 font-semibold">Time: 1:45</span>

      </div>
    <Button className="bg-white text-black rounded-lg shadow-2xl w-[95%] border-2 border-gray-200">Retake Quiz</Button>
    </div>
  );
};

export default CompletedQuizCard;
