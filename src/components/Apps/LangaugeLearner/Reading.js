import React, { useState } from 'react'

import './Reading.css'

const {tokenize}  = require("@nlpjs/lang-all")

export default function Reading(props){   
    
    const {studyLanguage, setShowHover, setHoverAnimation,setHoverWord} = props
    
    const [value, setValue] = useState("")                

    return (
        <div className="language-learner-reading" >
            <textarea className="language-learner-reading-input" value={value} onChange={e=>setValue(e.target.value)}></textarea>
            <div className="language-learner-reading-tokens">
                {tokenize(value.trim(),studyLanguage).map(word=>{
                    return <div className="language-learner-reading-token" onClick={
                            (e)=>{
                                setHoverAnimation("animate__pulse")
                                setHoverWord(word)
                                setShowHover(true);                                
                                e.stopPropagation()
                            }
                        }>{word}</div>
                })}
            </div>            
        </div>
    )

}
