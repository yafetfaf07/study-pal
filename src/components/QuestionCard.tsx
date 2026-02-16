import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionCardProps {
  no: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  ans: string;
  totalQuestion: number;
  onAnswerSelect: (questionId: string, selectedAnswer: string) => void; // Callback to pass selected answer
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  no,
  question,
  a,
  b,
  c,
  d,
  
  totalQuestion,
  onAnswerSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Handle RadioGroup selection
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    onAnswerSelect(no, value); // Pass question ID and selected answer to parent
  };

  // Fallback values to prevent undefined errors
  const safeNo = no || "1";
  const safeQuestion = question || "No question available";
  const safeA = a || "";
  const safeB = b || "";
  const safeC = c || "";
  const safeD = d || "";

  return (
    <div className="w-[95%] shadow-md bg-white m-5">
      <div className="bg-blue-500">
        <h2 className="text-white text-2xl pl-4 pb-2 pt-4 font-bold">
          {safeQuestion}
        </h2>
        <h4 className="text-gray-200 pl-4 pb-4">Test Your Knowledge</h4>
      </div>
      <div>
        <div className="flex justify-between p-2">
          <span className="text-gray-500">Question {safeNo} of {totalQuestion}</span>
        </div>
        <div className="p-2">
          <RadioGroup value={selectedOption} onValueChange={handleOptionChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="A" id="A" />
              <Label htmlFor="A">A: {safeA}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="B" id="B" />
              <Label htmlFor="B">B: {safeB}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="C" id="C" />
              <Label htmlFor="C">C: {safeC}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="D" id="D" />
              <Label htmlFor="D">D: {safeD}</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="progress w-[100%] bg-gray-200 h-[1px] flex justify-center rounded-lg"></div>
      <div className="flex justify-end mt-2"></div>
    </div>
  );
};

export default QuestionCard;