import React from "react";
import { FirstPickInput } from "./FirstPickInput";
import { JokeGrid } from "./JokeGrid";
import { Joke } from "../interfaces/Joke";
import { GuessingLetterInput } from "./GuessingLetterInput";

export const GameContainer = ({
  gameState,
  setGameState,
  joke,
}: {
  gameState: string;
  setGameState: React.Dispatch<
    React.SetStateAction<
      | "loading"
      | "firstPick"
      | "guessingLetter"
      | "guessingPunchline"
      | "completeWin"
      | "completeLoss"
    >
  >;
  joke: Joke;
}) => {
  // Letters that have been guessed
  const [letters, setLetters] = React.useState<string[]>([]);
  const [lives, setLives] = React.useState<number>(5);
  // Logic for InputContainer.  Determines which input to show based on gameState.
  const InputContainer = ({
    gameState,
    setGameState,
    letters,
    setLetters,
    punchline,
    lives,
    setLives,
  }: {
    gameState: string;
    setGameState: React.Dispatch<
      React.SetStateAction<
        | "loading"
        | "firstPick"
        | "guessingLetter"
        | "guessingPunchline"
        | "completeWin"
        | "completeLoss"
      >
    >;
    letters: string[];
    setLetters: React.Dispatch<React.SetStateAction<string[]>>;
    punchline: string;
    lives: number;
    setLives: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    if (gameState === "firstPick") {
      return (
        <FirstPickInput
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
        />
      );
    } else if (gameState === "guessingLetter") {
      return (
        <GuessingLetterInput
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
          punchline={punchline}
          lives={lives}
          setLives={setLives}
        />
      );
    }
  };

  if (gameState === "loading") return <div>Loading Joke of the day...</div>;
  else
    return (
      <>
        <h2 className="text-xl">{joke.setup}</h2>
        <JokeGrid formattedPunchline={joke.formattedPunchline} />
        <InputContainer
          gameState={gameState}
          setGameState={setGameState}
          letters={letters}
          setLetters={setLetters}
          punchline={joke.punchline}
          lives={lives}
          setLives={setLives}
        />
        <div>
          <h2 className="text-xl">Debug</h2>
          <div>Game State: {gameState}</div>
          <div>Letters: {letters}</div>
          <div>Punchline: {joke.punchline}</div>
          <div>Lives: {lives}</div>
        </div>
      </>
    );
};