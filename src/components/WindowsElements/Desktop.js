import React, { useState }/* , { useState } */ from 'react'

import './Desktop.css'

import ContextMenu from './ContextMenu'
import Window from './Window';

export default function Desktop(props) {
    const {
        openWindows        
    } = props    

    const contextMenuButtons = [
        {
            onClick:()=>{console.log("refresh")},
            text:"Refresh"
        },
        {
            onClick:()=>{console.log("properties")},
            text:"Properties"
        }
    ]

    const [contextMenuVisible, setContextMenuVisible] = useState(false)
    const [contextMenuStyles, setContextMenuStyles] = useState({})

    
    return (
        <div className="desktop" id="desktop" 
            onContextMenu={(e)=>{                                      
                setContextMenuVisible(true)
                let left = e.clientX
                let top = e.clientY

                if(top>visualViewport.height*0.67)
                    top-=250
                if(left>visualViewport.width*0.67)
                    left-=125                
                
                setContextMenuStyles({left:`${left}px`,top:`${top}px`})
            }}
            onClick={(e)=>{                
                setContextMenuVisible(false)                    
            }}
        >
        {
            contextMenuVisible?
                <ContextMenu 
                    buttons={contextMenuButtons} 
                    styles={contextMenuStyles}
                    setVisibility={setContextMenuVisible}>                        
                </ContextMenu>
            :
                null
        }
        {
            openWindows.map((window)=>{
                return  <Window key={window.windowID} windowObject={window}/>                    
            })
        }
        </div>
    )
}
