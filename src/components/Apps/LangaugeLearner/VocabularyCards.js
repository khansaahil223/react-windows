import React, { useState,useEffect } from 'react'
import DictionaryInput from './DictionaryInput'

import './VocabularyCards.css'

import {FaRegHandPointLeft,FaRegHandPointRight} from 'react-icons/fa'

import firebase from 'firebase/app'

export default function VocabularyCards(props) {
    const [dictionary, setDictionary] = useState() 

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showWordNotMeaning, setShowWordNotMeaning] = useState(true)    

    const [cardAnimation, setCardAnimation] = useState("")

    useEffect(()=>{
        const firebaseDictionaryRef = firebase.database().ref("dictionary")
        firebaseDictionaryRef.on('value',snapshot=>{
            const data = snapshot.val()
            const storedDictionary = Object.keys(data).map(id=>{return data[id]})   
            setDictionary(storedDictionary)  
        })       
    },[])

    if(!dictionary){
        return <progress></progress>
    }    

    const words = dictionary.map(d=>{return d.word})
    const meanings = dictionary.map(d=>{return d.meaning})

    return (
        <div className="language-learner-vocabulary-cards">
            <DictionaryInput toast={props.toast}></DictionaryInput>     

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
                            showWordNotMeaning?words[currentWordIndex]:meanings[currentWordIndex]
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
            </div>
        </div>
    )
}
