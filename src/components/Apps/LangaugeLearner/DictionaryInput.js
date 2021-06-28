import React, { useState } from 'react'
import './DictionaryInput.css'
import WordInputForm from './WordInputForm'

const {StemmerRu} = require('@nlpjs/lang-ru')
export default function DictionaryInput(props) {
    const [word, setWord] = useState("")        

    const [showHover, setShowHover] = useState(false)
    const [hoverAnimation, setHoverAnimation] = useState("animate__pulse")

    const stemmer = new StemmerRu()

    return (
        <div className="language-learner-dictionary-inputs-holder">
            <div className="language-learner-dictionary-input-holder">
                <div className="language-learner-dictionary-label">Word</div>
                <input value={word} onChange={e=>{setWord(e.target.value)}} className="language-learner-dictionary-input"></input>
            </div>

            <div className="language-learner-dictionary-input-button" onClick={()=>{
                setHoverAnimation("animate__pulse")
                setShowHover(true);
            }}>
                +
            </div>
            {
                showHover?<React.Fragment>
                    <div className={`language-learner-reading-hover animate__animated ${hoverAnimation}`} >
                        <WordInputForm toast={props.toast} selectedWord={word} wordStem = {stemmer.stemWord(word).replace(/[^\u0400-\u04FF]/,'')} setShowHover={setShowHover}></WordInputForm>
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
