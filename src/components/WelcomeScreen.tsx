import React from 'react';
import { BookOpen, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onTutorial: () => void;
}

export function WelcomeScreen({ onStart, onTutorial }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-12 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          ברוכים הבאים!
        </h1>
        <p className="text-xl text-gray-600">
          בואו נלמד חיבור וחיסור במאונך בדרך כיפית
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={onStart}
          className="flex items-center justify-center gap-3 px-8 py-4 text-xl font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Play className="w-6 h-6" />
          התחל משחק
        </button>
        <button
          onClick={onTutorial}
          className="flex items-center justify-center gap-3 px-8 py-4 text-xl font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          <BookOpen className="w-6 h-6" />
          הדרכה
        </button>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">מה נלמד?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>חיבור מספרים דו-ספרתיים במאונך</li>
          <li>חיסור מספרים דו-ספרתיים במאונך</li>
          <li>פירוק והשאלה בצורה ויזואלית</li>
          <li>תרגול אינטראקטיבי עם משוב מיידי</li>
        </ul>
      </div>
    </div>
  );
}