import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface QuizCardProps {
  name: string;
  desc: string;
  time: string;
  length: number;
  id: string;
  quizId: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ name, desc, time, length, quizId, id }) => {
  const navigate = useNavigate();

  const navigateToQuizPage = () => {
    navigate(`/groups/${id}/quiz/${quizId}`);
  };

  // Format the time prop to "Aug 25, 2025 6:41 PM"
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleString("en-US", {
        month: "short", // Aug
        day: "numeric", // 25
        year: "numeric", // 2025
        hour: "numeric", // 6
        minute: "2-digit", // 41
        hour12: true, // PM
      });
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date";
    }
  };

  return (
    <div className="bg-orange-50 border-2 border-orange-300 p-4 mt-4 rounded-lg">
      <div className="flex justify-between mt-2 mb-4">
        <h2 className="font-semibold">{name}</h2>
        <div className="bg-orange-100 rounded-4xl w-14 border-1 border-green-20 flex items-center justify-center">
          <span className="text-orange-700 text-[12px] font-medium">default</span>
        </div>
      </div>
      <span className="mt-5">{desc}</span>
      <div className="flex justify-between mt-2">
        <span>2:00</span>
        <span>{length} Questions</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-red-400 font-semibold">Quiz created at: {formatDate(time)}</span>
        <Button
          className="bg-orange-500 text-white rounded-lg"
          onClick={navigateToQuizPage}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;