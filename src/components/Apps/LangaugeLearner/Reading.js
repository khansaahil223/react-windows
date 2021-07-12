import React, { useEffect, useState } from 'react'

import './Reading.css'

import firebase from 'firebase/app'
import 'firebase/database'
const {tokenize}  = require("@nlpjs/lang-all")

export default function Reading(props){   
    
    const {studyLanguage, setShowHover, setHoverAnimation,setHoverWord} = props
    
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")                    

    const saveToReadingList = ()=>{            
        firebase.database().ref("readingList").push().set({
            title:title,
            content:value
        })
    }

    useEffect(()=>{        
        if(localStorage.getItem("currentReading")){
            const currentReading = JSON.parse(localStorage.getItem('currentReading'))
            setTitle(currentReading.title)
            setValue(currentReading.content)
        }
    },[])

    return (
        <div className="language-learner-reading" >
            <div className = "language-learner-reading-buttons">
                <button className="language-learner-reading-button" onClick={saveToReadingList}>
                    Add to Reading List
                </button>
            </div>
            <input placeholder="Title of what you are reading" className="language-learner-reading-title-input" value={title} onChange={e=>setTitle(e.target.value)}></input>
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
                        }
                        key={Math.random()}>{word}</div>
                })}
            </div>            
        </div>
    )

}
