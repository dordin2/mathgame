import React, { useState, useEffect } from 'react';
import { ArrowRight, HelpCircle, RefreshCw } from 'lucide-react';
import type { Operation } from '../App';

interface GameScreenProps {
  operation: Operation;
  onBack: () => void;
}

interface Problem {
  num1: number;
  num2: number;
}

interface NumberState {
  original: number;
  current: number;
  borrowed?: boolean;
  carried?: boolean;
}

function generateProblem(operation: Operation): Problem {
  if (operation === 'addition') {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * 90) + 10;
    return { num1, num2 };
  } else {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * num1) + 1;
    return { num1, num2 };
  }
}

function splitNumber(num: number): [number, number] {
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return [tens, ones];
}

export function GameScreen({ operation, onBack }: GameScreenProps) {
  const [problem, setProblem] = useState<Problem>(generateProblem(operation));
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [message, setMessage] = useState<string>('');
  
  const [topTens, topOnes] = splitNumber(problem.num1);
  const [bottomTens, bottomOnes] = splitNumber(problem.num2);
  
  const [tensState, setTensState] = useState<NumberState>({ 
    original: topTens, 
    current: topTens 
  });
  const [onesState, setOnesState] = useState<NumberState>({ 
    original: topOnes, 
    current: topOnes 
  });

  const correctAnswer = operation === 'addition' 
    ? problem.num1 + problem.num2 
    : problem.num1 - problem.num2;

  const handleBorrowOrCarry = (position: 'tens' | 'ones') => {
    if (operation === 'subtraction') {
      if (position === 'tens' && !tensState.borrowed && onesState.current < bottomOnes) {
        setTensState(prev => ({
          ...prev,
          current: prev.current - 1,
          borrowed: true
        }));
        setOnesState(prev => ({
          ...prev,
          current: prev.current + 10,
          borrowed: true
        }));
      }
    } else { // addition
      if (position === 'ones' && onesState.current + bottomOnes >= 10) {
        const sum = onesState.current + bottomOnes;
        setOnesState(prev => ({
          ...prev,
          current: sum % 10,
          carried: true
        }));
        setTensState(prev => ({
          ...prev,
          current: prev.current + 1,
          carried: true
        }));
      }
    }
  };

  const checkAnswer = () => {
    const answer = parseInt(userAnswer);
    if (answer === correctAnswer) {
      setMessage('כל הכבוד! התשובה נכונה! 🎉');
      setTimeout(() => {
        resetProblem();
      }, 2000);
    } else {
      setMessage('לא מדויק, נסה שוב');
    }
  };

  const resetProblem = () => {
    const newProblem = generateProblem(operation);
    setProblem(newProblem);
    setUserAnswer('');
    setMessage('');
    setShowHint(false);
    const [newTopTens, newTopOnes] = splitNumber(newProblem.num1);
    setTensState({ original: newTopTens, current: newTopTens });
    setOnesState({ original: newTopOnes, current: newTopOnes });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowRight className="w-5 h-5" />
          חזרה
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            <HelpCircle className="w-5 h-5" />
            רמז
          </button>
          <button
            onClick={resetProblem}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-5 h-5" />
            תרגיל חדש
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <div className="text-4xl font-mono space-y-2 ltr">
            <div className="flex justify-end gap-1">
              <button
                onClick={() => handleBorrowOrCarry('tens')}
                className={`w-8 text-center ${
                  tensState.borrowed ? 'text-red-500' : 
                  tensState.carried ? 'text-green-500' : 
                  'hover:text-blue-500'
                } transition-colors`}
              >
                {tensState.current}
              </button>
              <button
                onClick={() => handleBorrowOrCarry('ones')}
                className={`w-8 text-center ${
                  onesState.borrowed ? 'text-red-500' : 
                  onesState.carried ? 'text-green-500' : 
                  'hover:text-blue-500'
                } transition-colors`}
              >
                {onesState.current}
              </button>
            </div>
            <div className="flex items-center justify-end">
              <span className="mr-2">{operation === 'addition' ? '+' : '-'}</span>
              <span className="w-8 text-center">{bottomTens}</span>
              <span className="w-8 text-center">{bottomOnes}</span>
            </div>
            <div className="border-b-4 border-gray-400 w-32"></div>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 text-right outline-none focus:border-indigo-500"
              placeholder="?"
            />
          </div>
        </div>

        {showHint && (
          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-indigo-900 mb-2">טיפ:</h4>
            <p className="text-indigo-700">
              {operation === 'addition' 
                ? 'לחץ על ספרת היחידות כדי להעביר עשרת ימינה כשסכום היחידות גדול מ-9'
                : 'לחץ על ספרת העשרות כדי ללוות עשרת כשהמספר העליון קטן מהתחתון'}
            </p>
          </div>
        )}

        {message && (
          <div className={`text-center text-lg font-semibold ${
            message.includes('כל הכבוד') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={checkAnswer}
            className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            בדוק תשובה
          </button>
        </div>
      </div>
    </div>
  );
}