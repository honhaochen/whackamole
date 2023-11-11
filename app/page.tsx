"use client";

import { useState, useEffect } from "react";

const generateRandomIndex = () => Math.floor(Math.random() * 9);

export default function Home() {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);

  const handleWhack = (index: number) => {
    if (moles[index]) {
      // Whacked a mole, increase score
      setScore((prevScore) => prevScore + 1);
    }
    // Reset the mole status
    const newMoles = [...moles];
    newMoles[index] = false;
    setMoles(newMoles);
  };

  useEffect(() => {
    const moleInterval = setInterval(() => {
      // Show a mole at a random position
      const randomIndex = generateRandomIndex();
      const newMoles = [...moles];
      newMoles[randomIndex] = true;
      setMoles(newMoles);

      // Hide the mole after a short delay
      setTimeout(() => {
        const resetMoles = [...newMoles];
        resetMoles[randomIndex] = false;
        setMoles(resetMoles);
      }, 1000);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(moleInterval);
  }, [moles]);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-center mb-2">Whack-a-Mole</h1>
      <p className="text-center mb-2">Score: {score}</p>
      <div className="grid grid-cols-3 gap-10">
        {moles.map((mole, index) => (
          <div
            key={index}
            className={`flex min-w-[6rem] min-h-[6rem] justify-center text-center ${
              mole ? "bg-green-300" : "bg-gray-300"
            }`}
            onClick={() => handleWhack(index)}
          />
        ))}
      </div>
    </div>
  );
}
