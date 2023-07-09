import { useState, useEffect, useRef } from 'react';

function App() {
  const [secondsLeft, setSecondsLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (secondsLeft === 0) {
      alert('Time is up!');
      setIsRunning(false);
    }
  }, [secondsLeft]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      if (secondsLeft === 0) {
        setSecondsLeft(1500);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setSecondsLeft(1500);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-6xl font-bold">
        {`${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`}
      </div>
      <div className="flex space-x-4 mt-6">
        {isRunning ? (
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white font-bold rounded"
            onClick={stopTimer}>
            Stop
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white font-bold rounded"
            onClick={startTimer}>
            Start
          </button>
        )}
        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-white font-bold rounded"
          onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
