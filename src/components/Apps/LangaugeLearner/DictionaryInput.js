import React, { useState } from 'react'
import './DictionaryInput.css'
import WordInputForm from './WordInputForm'

const {stem} = require('@nlpjs/lang-all')
export default function DictionaryInput(props) {
    const [word, setWord] = useState("")            
    const {showHover, setShowHover,hoverAnimation, setHoverAnimation,studyLanguage,setHoverWord} = props    

    return (
        <div className="language-learner-dictionary-inputs-holder">
            <div className="language-learner-dictionary-input-holder">
                <div className="language-learner-dictionary-label">Word</div>
                <input value={word} onChange={e=>{setWord(e.target.value)}} className="language-learner-dictionary-input"></input>
            </div>

            <div className="language-learner-dictionary-input-button" onClick={()=>{
                setHoverWord(word)
                setHoverAnimation("animate__pulse")
                setShowHover(true);
            }}>
                +
            </div>
            {
                showHover?<React.Fragment>
                    <div className={`language-learner-reading-hover animate__animated ${hoverAnimation}`} >
                        <WordInputForm toast={props.toast} selectedWord={word} wordStem = {stem(word,studyLanguage)} setShowHover={setShowHover}></WordInputForm>
                        <div className="language-learner-reading-hover-close" onClick={
                            ()=>{
                                setHoverAnimation("animate__zoomOut")
                                setTimeout(()=>{setShowHover(false)},200)
                            }}>X</div>
                    </div>                    
                </React.Fragment>:null
            }
        </div>
    )
}
