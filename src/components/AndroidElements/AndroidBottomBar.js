import React from 'react'

import './AndroidBottomBar.css'

import { IconContext } from 'react-icons'

import {AiFillHome,AiOutlineRollback,AiOutlineRetweet} from 'react-icons/ai'

export default function AndroidBottomBar(props) {

    const {goHome}=props

    return (
        <div className="android-bottom-bar-holder">
            {/* <div className="android-bottom-bar-button" onClick={()=>goHome()}>
                <IconContext.Provider value={{style:{width:"100%",height:"100%"}}}>
                    <AiOutlineRollback></AiOutlineRollback>
                </IconContext.Provider>                
            </div> */}
            <div className="android-bottom-bar-button"  onClick={()=>goHome()}>
                <IconContext.Provider value={{style:{width:"100%",height:"100%"}}}>
                    <AiFillHome></AiFillHome>
                </IconContext.Provider>                
            </div>
            {/* <div className="android-bottom-bar-button"  onClick={()=>goHome()}>
                <IconContext.Provider value={{style:{width:"100%",height:"100%"}}}>
                    <AiOutlineRetweet></AiOutlineRetweet>
                </IconContext.Provider>                
            </div> */}

            
        </div>
    )
}
