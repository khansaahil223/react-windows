import React, { useState,useEffect } from 'react'
import DictionaryInput from './DictionaryInput'

import './VocabularyCards.css'

import {FaRegHandPointLeft,FaRegHandPointRight} from 'react-icons/fa'

export default function VocabularyCards(props) {
    const words = JSON.parse(localStorage.getItem('words'))
    const meanings = JSON.parse(localStorage.getItem('meanings'))

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showWordNotMeaning, setShowWordNotMeaning] = useState(true)    

    const [cardAnimation, setCardAnimation] = useState("")

    return (
        <div className="language-learner-vocabulary-cards">
            <DictionaryInput toast={props.toast}></DictionaryInput>
            {
                words && meanings?
                <div className="language-learner-vocabulary-cards-main">
                    <div className="language-learner-vocabulary-cards-navbutton" 
                        onClick={()=>{
                            if(currentWordIndex>0){
                                setCurrentWordIndex(currentWordIndex-1)
                                setCardAnimation("")
                                setTimeout(()=>setCardAnimation("animate__lightSpeedInLeft"),1)  
                                setShowWordNotMeaning(true)
                            }
                        }
                    }>
                        <FaRegHandPointLeft></FaRegHandPointLeft>
                    </div>

                    <div className={`language-learner-vocabulary-cards-card animate__animated ${cardAnimation}`} 
                        onClick={()=>{
                            setCardAnimation("")
                            setTimeout(()=>setCardAnimation("animate__flipInX"),1)
                            setShowWordNotMeaning(!showWordNotMeaning)
                        }}
                        style={                            
                            {
                                background:showWordNotMeaning?"#259708":"#893e08",
                                animationDuration:cardAnimation==="animate__flipInX"?".7s":".2s"
                            }                            
                        }
                    >
                        <div className="language-learner-vocabulary-cards-card-text" onClick={e=>e.stopPropagation()}>
                            {
                                showWordNotMeaning?words[currentWordIndex]:meanings[words[currentWordIndex]]
                            }
                        </div>
                    </div>
                    
                    <div className="language-learner-vocabulary-cards-navbutton"  
                        onClick={()=>{
                            if(currentWordIndex<words.length-1){
                                setCurrentWordIndex(currentWordIndex+1)
                                setCardAnimation("")
                                setTimeout(()=>setCardAnimation("animate__lightSpeedInRight"),1)
                                setShowWordNotMeaning(true)                                
                            }
                        }}>
                        <FaRegHandPointRight></FaRegHandPointRight>
                    </div>
                </div>:null
            }
        </div>
    )
}
