import React from "react";
//import { useContext } from "react";
//import { LettersContext } from "../contexts/LettersContext";
interface GuessingLetterInputProps {
  gameState:
    | "loading"
    | "firstPick"
    | "guessingLetter"
    | "guessingPunchline"
    | "completeWin"
    | "completeLoss";
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
  setFeedbackMsg: React.Dispatch<React.SetStateAction<string>>;
}
export const GuessingLetterInput: React.FC<GuessingLetterInputProps> = ({
  //gameState,
  setGameState,
  letters,
  setLetters,
  punchline,
  lives,
  setLives,
  setFeedbackMsg,
}) => {
  const [letterGuess, setLetterGuess] = React.useState<string[]>(
    Array(1).fill("")
  );
  //const { letters } = useContext(LettersContext);
  const handleInputChange = (value: string[]) => {
    const newLetterGuess = value;

    setLetterGuess(newLetterGuess);
  };

  const checkLetter = (letter: string) => {
    if (punchline.includes(letter)) {
      setFeedbackMsg(letter + " Found ✅");
      return true;
    } else {
      setLives(lives - 1);
      setFeedbackMsg(letter + " Not Found ❌");
      //console.log(lives);
      if (lives - 1 === 0) {
        setGameState("completeLoss");
      }
      return false;
    }
  };

  const submitButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div className="flex flex-col text-center items-center font-teko-semibold">
      <button
        className="m-1 p-1 border-2 border-gray-600 text-center text-lg w-fit rounded-md shadow-md"
        onClick={() => {
          setGameState("guessingPunchline");
        }}
      >
        Guess Punchline
      </button>
      <h2 className="text-xl">Pick A Letter</h2>
      <div className="flex flex-col items-center">
        <input
          type="text"
          maxLength={1}
          value={letterGuess}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            if (
              (value === "" || /^[a-zA-Z]$/.test(value)) &&
              !letters.includes(value)
            ) {
              handleInputChange([value]);
              if (value !== "") {
                submitButtonRef.current?.focus();
              }
            }
          }}
          className="m-1 p-1 border-2 border-gray-600 w-10 text-center rounded-md shadow-md"
        />
        <button
          ref={submitButtonRef}
          className="m-1 p-1 border-2 border-gray-600 text-center text-lg w-fit rounded-md shadow-md"
          onClick={() => {
            if (!letters.includes(letterGuess[0]) && letterGuess[0] !== "") {
              checkLetter(letterGuess[0]);
              // append letterGuess to letters
              setLetters([...letters, ...letterGuess]);
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
