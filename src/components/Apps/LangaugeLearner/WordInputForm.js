import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { IconContext } from 'react-icons'
import { GrRevert } from 'react-icons/gr'

import './WordInputForm.css'

import {stem} from '@nlpjs/lang-all'
import firebase from 'firebase'
const translate = require("translate")
translate.engine="libre"

export default function WordInputForm(props) {

    const {selectedWord,wordStem,toast,knownLanguage,studyLanguage} = props

    const [translation, setTranslation] = useState("")    
    const [translationInput, setTranslationInput] = useState("")    

    const [selectedWordInput, setSelectedWordInput] = useState(selectedWord)
    const [wordStemInput, setWordStemInput] = useState(wordStem)

    const setVisible = props.setShowHover

    useEffect(() => {        
        var data = JSON.stringify({"q":selectedWordInput,"source":studyLanguage,"target":knownLanguage});

        var config = {
            method: 'post',
            url: 'https://libretranslate.de/translate',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {            
            setTranslation(response.data.translatedText)
            setTranslationInput(response.data.translatedText)
        })
        .catch(function (error) {
            console.log(error);
        });

    }, [knownLanguage, selectedWordInput, studyLanguage])        

    return (
        <div className="language-learner-word-input">
            <div className="language-learner-word-input-row">Selected Word:<input value={selectedWordInput} 
            onChange={e=>{                
                setSelectedWordInput(e.target.value)
                setWordStemInput(stem(e.target.value,studyLanguage))
            }}></input></div>              
            
            
            <div className="language-learner-word-input-row">Meaning:
                <input value={translationInput} onChange={e=>setTranslationInput(e.target.value)}></input>                 
                <IconContext.Provider value={{className:"language-learner-word-input-clear-button"}}>
                    <GrRevert onClick={()=>setTranslationInput(translation)}></GrRevert>
                </IconContext.Provider>                
            </div>
           
           
            <div className="language-learner-word-input-row">Word Stem:<input value={wordStemInput} onChange={e=>setWordStemInput(e.target.value)}></input></div>
           
           
            <div onClick={
                e=>{
                    const firebaseDictionaryRef = firebase.database().ref("dictionary")

                    firebaseDictionaryRef.on('value',snapshot=>{
                        const data = snapshot.val()
                        const dictionary = Object.keys(data).map(id=>{return data[id]})

                        const words = dictionary.map(x=>{return x.word})

                        let stem = wordStem   
                        const toastDuration = 1200                         
                                           
                        if(words.indexOf(stem)===-1){
                            firebaseDictionaryRef.push().set({word:stem,meaning:translation})
                            toast("word saved!",toastDuration) 
                            setVisible(false)  
                        }            
                        else{
                            toast("word already exists in dictionary",toastDuration)                                    
                        }                    
                    })
                                                
                        e.stopPropagation()
                    }                   
                                                                    
                }
             className="language-learner-word-input-button">Add to dictionary</div>
        </div>
    )
}
