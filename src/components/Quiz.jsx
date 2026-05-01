import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: "Myth or Fact: You can vote online in India.",
      options: ["Myth", "Fact"],
      answer: "Myth",
      explanation: "Currently, voting in India must be done in person at a designated polling booth using EVMs or paper ballots."
    },
    {
      question: "Myth or Fact: You need a physical Voter ID card to vote.",
      options: ["Myth", "Fact"],
      answer: "Myth",
      explanation: "While a Voter ID is best, you can use other approved IDs (like Aadhaar, PAN card, Passport) if your name is on the electoral roll."
    },
    {
      question: "Myth or Fact: You can register to vote if you are turning 18 soon but aren't 18 yet.",
      options: ["Myth", "Fact"],
      answer: "Fact",
      explanation: "You can apply in advance! If you turn 18 by the qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1), you can submit Form 6 beforehand."
    },
    {
      question: "Myth or Fact: You can vote from anywhere in your city.",
      options: ["Myth", "Fact"],
      answer: "Myth",
      explanation: "You must vote ONLY at the specific polling booth assigned to your residential address."
    }
  ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 2500); // Wait to show explanation
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Election Myths vs Facts</h2>
        <p className="text-gray-400">Test your knowledge and avoid common misconceptions.</p>
      </div>

      <div className="glass-panel p-6 md:p-10 relative overflow-hidden">
        {/* Progress bar */}
        {!showResult && (
           <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
             <motion.div 
               className="h-full bg-brand-500"
               initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
               animate={{ width: `${((currentQuestion + (selectedAnswer ? 1 : 0)) / questions.length) * 100}%` }}
             />
           </div>
        )}

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full"
            >
              <div className="text-sm font-medium text-brand-400 mb-6">Question {currentQuestion + 1} of {questions.length}</div>
              <h3 className="text-2xl font-semibold text-white mb-8">{questions[currentQuestion].question}</h3>

              <div className="space-y-4 mb-8">
                {questions[currentQuestion].options.map((option, idx) => {
                  let buttonClass = "w-full text-left p-4 rounded-xl border transition-all text-lg font-medium ";
                  
                  if (!selectedAnswer) {
                    buttonClass += "bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white";
                  } else {
                    if (option === questions[currentQuestion].answer) {
                      buttonClass += "bg-green-500/20 border-green-500 text-green-400"; // Correct
                    } else if (option === selectedAnswer) {
                      buttonClass += "bg-red-500/20 border-red-500 text-red-400"; // Wrong selected
                    } else {
                      buttonClass += "bg-gray-800/50 border-gray-700 text-gray-500 opacity-50"; // Unselected
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(option)}
                      className={buttonClass}
                    >
                      <div className="flex justify-between items-center">
                        {option}
                        {selectedAnswer && option === questions[currentQuestion].answer && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        {selectedAnswer === option && option !== questions[currentQuestion].answer && <XCircle className="h-5 w-5 text-red-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {selectedAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${selectedAnswer === questions[currentQuestion].answer ? 'bg-green-500/10 border-green-500/30' : 'bg-brand-500/10 border-brand-500/30'}`}
                >
                  <p className="text-sm text-gray-200">
                    <span className="font-bold mr-2">Explanation:</span> 
                    {questions[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl font-bold text-white mb-2">{score}/{questions.length}</div>
              <h3 className="text-2xl font-semibold text-brand-400 mb-6">
                {score === questions.length ? "Electoral Expert!" : score > 1 ? "Good start, keep learning!" : "Time to review the guide!"}
              </h3>
              <button 
                onClick={resetQuiz}
                className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-full font-medium transition-colors"
              >
                Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
