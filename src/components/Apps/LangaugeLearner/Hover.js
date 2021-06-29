import React from 'react'

import './Hover.css'

import WordInputForm from './WordInputForm'

import { stem } from '@nlpjs/lang-all'

export default function Hover(props) {

    const {word,studyLanguage,setShowHover,hoverAnimation, setHoverAnimation} = props    

    return (
        <div className={`language-learner-hover animate__animated ${hoverAnimation}`} >
            <WordInputForm toast={props.toast} selectedWord={word} 
                wordStem = {stem(word,studyLanguage)[0].replace(/[^\u0400-\u04FF]/,'')} 
                {...props}
                ></WordInputForm>
            <div className="language-learner-hover-close" onClick={
                ()=>{
                    setHoverAnimation("animate__zoomOut")
                    setTimeout(()=>{setShowHover(false)},200)
                }}                
                >X</div>
        </div> 
    )
}
