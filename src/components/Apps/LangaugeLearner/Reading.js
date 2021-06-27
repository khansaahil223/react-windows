import React, { useState } from 'react'

import './Reading.css'
import WordInputForm from './WordInputForm'

const {StemmerRu,TokenizerRu} = require('@nlpjs/lang-ru')

export default function Reading(props){    
    const [value, setValue] = useState("")

    const [showHover, setShowHover] = useState(false)

    const [selectedWord, setSelectedWord] = useState("")

    const stemmer = new StemmerRu()
    const tokenizer = new TokenizerRu()

    const [hoverAnimation, setHoverAnimation] = useState("animate__pulse")

    return (
        <div className="language-learner-reading" >
            <textarea className="language-learner-reading-input" value={value} onChange={e=>setValue(e.target.value)}></textarea>
            <div className="language-learner-reading-tokens">
                {tokenizer.tokenize(value.trim()).map(word=>{
                    return <div className="language-learner-reading-token" onClick={
                            (e)=>{
                                setHoverAnimation("animate__pulse")
                                setShowHover(true);
                                setSelectedWord(word);
                                e.stopPropagation()
                            }
                        }>{word}</div>
                })}
            </div>
            {
                showHover?<React.Fragment>
                    <div className={`language-learner-reading-hover animate__animated ${hoverAnimation}`} >
                        <WordInputForm toast={props.toast} selectedWord={selectedWord} wordStem = {stemmer.stemWord(selectedWord).replace(/[^\u0400-\u04FF]/,'')} setShowHover={setShowHover}></WordInputForm>
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
