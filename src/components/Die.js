import React from 'react'

export default function Die(props){
    const style={
        backgroundColor:props.isHeld ? '#59e391':'white'
    }


    return (
        
        <div className='dice-face' style={style} onClick={props.hold}>

            <h2 className='die-num'>{props.value}</h2>
            
        </div>
    )

}