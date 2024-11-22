import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './components/WelcomeScreen';
import { GameScreen } from './components/GameScreen';
import { Tutorial } from './components/Tutorial';

export type GameState = 'welcome' | 'tutorial' | 'operation-select' | 'game';
export type Operation = 'addition' | 'subtraction';

function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [operation, setOperation] = useState<Operation>('addition');

  return (
    <Layout>
      {gameState === 'welcome' && (
        <WelcomeScreen 
          onStart={() => setGameState('operation-select')}
          onTutorial={() => setGameState('tutorial')}
        />
      )}
      {gameState === 'tutorial' && (
        <Tutorial onBack={() => setGameState('welcome')} />
      )}
      {gameState === 'operation-select' && (
        <div className="flex flex-col items-center justify-center gap-8">
          <h2 className="text-3xl font-bold text-indigo-700">בחר פעולה</h2>
          <div className="flex gap-6">
            <button
              onClick={() => {
                setOperation('addition');
                setGameState('game');
              }}
              className="px-8 py-4 text-xl font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              חיבור
            </button>
            <button
              onClick={() => {
                setOperation('subtraction');
                setGameState('game');
              }}
              className="px-8 py-4 text-xl font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              חיסור
            </button>
          </div>
        </div>
      )}
      {gameState === 'game' && (
        <GameScreen 
          operation={operation}
          onBack={() => setGameState('operation-select')}
        />
      )}
    </Layout>
  );
}

export default App;