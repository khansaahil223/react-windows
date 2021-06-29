import React from 'react'
import './Dictionary.css'
import DictionaryInput from './DictionaryInput'


export default function Dictionary(props) {    

    const wordsFromLocalStorage = JSON.parse(localStorage.getItem("words"))
    const meaningsFromLocalStorage = JSON.parse(localStorage.getItem("meanings"))
    
    return (
        <div className="language-learner-dictionary">
            <DictionaryInput toast={props.toast} {...props}></DictionaryInput>
            <div className="language-learner-dictionary-list">
                {            
                    wordsFromLocalStorage?wordsFromLocalStorage.map(w=>{
                        return <div className="language-learner-dictionary-list-item-holder" key={w}>
                            <div className="language-learner-dictionary-list-word">{w}</div>
                            <div className="language-learner-dictionary-list-meaning">{meaningsFromLocalStorage[w]}</div>
                        </div>
                        }):null
                }
            </div>
        </div>
    )
}
