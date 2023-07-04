import React from 'react'
import Die from './components/Die'
import { v4 as uuidv4 } from 'uuid';


export default function App(){
  const[dice, setDice] = React.useState(allNewDice())
  const[tenzies, setTenzies]= React.useState(false)

  React.useEffect(()=>
  {
    const allHeld=dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value===firstValue)

    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("You have won")
    }
  },
  [dice]
  )

  const diceElement = dice.map(
    function(die){
     return (<Die 
          key={die.id}
          value={die.value}
          isHeld={die.isHeld}
          hold={()=> holdDice(die.id)}
          />
     )
    }

  )

  function allNewDice(){
    let dices = []
    let randomNum
    var i=0;
    while(dices.length<10){
      randomNum = {
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:uuidv4()
      }
      
      dices=[randomNum, ...dices]
      i++
      
    }
    return dices
  }

  function changeNum(){
    setDice(prevDice => prevDice.map(die =>{
      return die.isHeld ? die : {
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:uuidv4()
        
      }
      }
    ))
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(
      die => {
        return die.id === id ? {...die, isHeld:!die.isHeld} :
        die
      }
    )
      
      
    )
  }

  function resetGame(){
    setTenzies(false)
    setDice(allNewDice())
  }
  return (
    <main>
      {tenzies && <h1>You Win!</h1>}
      <div className='game' style={{display:tenzies ? "none" : "block"}}>
      <h1 className='title'>Kid Game</h1>
      <p className='instructions'>Roll until all the dice are the same. Click each die to freeze it
      at it current values between rolls</p> 
     
      <div className='dice-container'>
        {diceElement}
      </div>
      </div> 
      <div className='roll-btn' onClick={!tenzies ? changeNum : resetGame}>
        {tenzies ? "New Game" : "Roll"}
      </div>
    </main>
  )
}

