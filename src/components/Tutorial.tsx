import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TutorialProps {
  onBack: () => void;
}

export function Tutorial({ onBack }: TutorialProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
      >
        <ArrowRight className="w-5 h-5" />
        חזרה
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">איך מחשבים במאונך?</h2>

        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">חיבור במאונך</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <pre className="text-2xl font-mono text-center mb-4 ltr">
                {`  23
+  45
----
  68`}
              </pre>
              <ol className="list-decimal list-inside space-y-2">
                <li>מסדרים את המספרים זה מתחת לזה, יחידות מתחת ליחידות ועשרות מתחת לעשרות</li>
                <li>מתחילים משמאל - מחברים את היחידות (3+5=8)</li>
                <li>עוברים ימינה - מחברים את העשרות (2+4=6)</li>
                <li>התוצאה הסופית היא 68</li>
              </ol>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">חיסור במאונך</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <pre className="text-2xl font-mono text-center mb-4 ltr">
                {`  52
-  17
----
  35`}
              </pre>
              <ol className="list-decimal list-inside space-y-2">
                <li>מסדרים את המספרים זה מתחת לזה</li>
                <li>מתחילים משמאל - מחסרים את היחידות (2-7)</li>
                <li>אם אי אפשר לחסר, משאילים עשרת מהספרה הימנית</li>
                <li>עוברים ימינה - מחסרים את העשרות</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}