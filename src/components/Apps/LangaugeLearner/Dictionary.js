import React, { useState } from 'react'

const {StemmerRu} = require('@nlpjs/lang-ru')

export default function Dictionary() {    

    const [value, setValue] = useState("")    

    const wordsFromLocalStorage = JSON.parse(localStorage.getItem("words"))
    const meaningsFromLocalStorage = JSON.parse(localStorage.getItem("meanings"))

    const stemmerRU = new StemmerRu()
    return (
        <div>
            <input value={value} onChange={e=>{setValue(e.target.value)}}></input>
            {            
                wordsFromLocalStorage?wordsFromLocalStorage.map(w=>{return <li key={w}>{w}:      {meaningsFromLocalStorage[w]}</li>}):null
            }
        </div>
    )
}
