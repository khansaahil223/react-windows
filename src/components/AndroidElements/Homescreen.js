import React from 'react'
import './Homescreen.css'
import { InstalledApplications } from '../GlobalVariables'

import {IconContext} from 'react-icons'

export default function Homescreen(props) {

    const {openApp} = props

    return (
        <div className="homescreen">
            <div className="homescreen-icon-grid">
            {
                InstalledApplications.map((ia=>{
                    return <div className="homescreen-icon-grid-item">
                        <IconContext.Provider value={{className:"homescreen-icon"}} key={ia.name} >
                            <ia.Icon onClick={()=>openApp(ia)}></ia.Icon>
                        </IconContext.Provider>
                        <div  className="homescreen-icon-label">{ia.name}</div>
                        </div>
                }))
            }
            </div>
        </div>
    )
}
