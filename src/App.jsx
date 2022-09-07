import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [Dice, setDice] = React.useState(allNewDice());

  const [tenzeis, setTenzeis] = React.useState(false);

  React.useEffect(() => {
    const win = Dice.every(
      (die) => die.value === Dice[0].value && die.isHeld === true
    );

    if (win) {
      setTenzeis(true);
    } else {
      setTenzeis(false);
    }
  }, [Dice]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 7),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  // this id should always be passed unto a compenent as key prop
  const Dices = Dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      Hold={() => Hold(die.id)}
    />
  ));

  function newDice() {
    if (!tenzeis) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    } else {
      setDice(allNewDice);
    }
  }

  function Hold(id) {
    // make sure to put return on a setState's .map because it returns an array of objects
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  return (
    <main className="main--wrapper">
      {tenzeis && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls. <br /> <br /> {tenzeis && "You Win"}
      </p>
      <div className="die--wrapper">{Dices}</div>
      <div className="roll-container">
        <button className="roll--button" onClick={newDice}>
          {tenzeis ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
