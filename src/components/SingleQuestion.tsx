import React from 'react';

interface SingleQuestionProps {
  option: string;
  isCorrect: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitted: boolean;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({ option, isCorrect, checked, onChange, isSubmitted }) => {
  const getOptionStyle = () => {
    if (!isSubmitted) return {};
    return isCorrect ? { backgroundColor: '#d4edda' } : (checked ? { backgroundColor: '#f8d7da' } : {});
  };

  return (
    <div className="flex border-gray-200 border-1 mb-5 rounded-sm ml-5 mr-5" style={getOptionStyle()}>
      <input
        type="radio"
        className="ml-1"
        checked={checked}
        onChange={onChange}
        value={option}
        name={`question-option-${option}`} // Unique name per question
        disabled={isSubmitted}
      />
      <p className="p-2">{option}</p>
    </div>
  );
};

export default SingleQuestion;