import React from "react";
import "./Main.css";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function Main() {
    const [dices, setDices] = React.useState(createNewDies)
    const [win, setWin] = React.useState(false)

    React.useEffect(() => {
        const firstValue = dices[0].number
        const isAllSameNumber = dices.every((die) => die.number === firstValue)
        const isAllHold = dices.every((die) => die.isHold)
        if (isAllHold && isAllSameNumber) {
            setWin(true)
        }
    },[dices])


    function generateNewDice() {
        return {id: nanoid(), isHold: false, number: Math.ceil(Math.random() * 6)}
    }


    function createNewDies() {
        const array = [];
        for (let i = 0; i < 10; i++) {
            array.push(generateNewDice())
        }
        return array;
    }  

    function holdHandler(id) {
        setDices((prev) => 
                prev.map(die => die.id === id ? {...die, isHold:!die.isHold} : die)
        )
    }

    function reRoll() {
        if (!win) {
            setDices(oldDices => {
                return oldDices.map(die => {
                        return die.isHold ? die : generateNewDice()
                    })
            })
        } else {
            setDices(createNewDies())
            setWin(false)
        }
    }


    const dicesElements = dices.map((die) => (
    <Die key={die.id} 
    isHold={die.isHold} 
    number={die.number} 
    holdHandler={() => holdHandler(die.id)}/>))

    return(
        <main>
            {win && <Confetti />}
            <div className="tenzies-container">
                <h1>Tenzies Game</h1>
                <p>Keep Rolling and Selecting until you got all the number the same</p>
                <div className="dice-containers">
                    {dicesElements}
                </div>
                <button onClick={reRoll}>{win? "Next Game" :"Roll Dice"}</button>
            </div>
        </main>
    )
}