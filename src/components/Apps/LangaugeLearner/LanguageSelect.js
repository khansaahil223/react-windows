import React from 'react'
import './LanguageSelect.css'

export default function LanguageSelect(props) {

    const {
        knownLanguage, setKnownLanguage,
        studyLanguage, setStudyLanguage
    } = props

    const languageOptions=<React.Fragment>
        <option value="ar">Arabic</option>                                
        <option value="de">German</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
        <option value="it">Italian</option>
        <option value="ko">Korean</option>
        <option value="ru">Russian</option>
        <option value="tr">Turkish</option>
    </React.Fragment>    

    return (
        <div className="language-learner-language-select">
            <div className="language-learner-language-select-input-holder">
                <div className="language-learner-language-select-label">I know:</div>
                <select className="language-learner-language-select-input" value={knownLanguage} onChange={e=>setKnownLanguage(e.target.value)}>
                    {languageOptions}
                </select>
            </div>
            <div className="language-learner-language-select-input-holder">
                <div className="language-learner-language-select-label" >I study:</div>
                <select className="language-learner-language-select-input" value={studyLanguage} onChange={e=>setStudyLanguage(e.target.value)}>
                    {languageOptions}
                </select>
            </div>
            <div className="language-learner-language-select-button" 
                onClick={()=>{
                    localStorage.setItem("knownLanguage",knownLanguage)
                    localStorage.setItem("studyLanguage",studyLanguage)
                }}
            >
                Save
            </div>
        </div>
    )
}
