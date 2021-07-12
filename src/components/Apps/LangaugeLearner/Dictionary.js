import React, { useEffect, useState } from 'react'
import './Dictionary.css'
import DictionaryInput from './DictionaryInput'

import firebase from 'firebase/app'

export default function Dictionary(props) {    

    const [dictionary, setDictionary] = useState()    

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
    
    return (
        <div className="language-learner-dictionary">
            <DictionaryInput toast={props.toast} {...props}></DictionaryInput>
            <div className="language-learner-dictionary-list">
                {            
                    dictionary && dictionary.map(item=>{
                        return <div className="language-learner-dictionary-list-item-holder" key={item.word}>
                            <div className="language-learner-dictionary-list-word">{item.word}</div>
                            <div className="language-learner-dictionary-list-meaning">{item.meaning}</div>
                        </div>
                        })
                }
            </div>
        </div>
    )
}
