import React, { useEffect } from 'react'

import './Window.css'

import { Rnd } from 'react-rnd'

import { IconContext } from "react-icons";
import {VscClose,VscChromeMaximize, VscChromeRestore,VscChromeMinimize} from 'react-icons/vsc'

export default function Window(props) {
    const {        
        windowObject        
    } = props         
                     
    useEffect(() => {
        if(windowObject.active===false && windowObject.maximized===true){
            windowObject.toggleWindowMaximizeRestore()                
            windowObject.updateWindowProperty("animation","")
        }
      })
    return (
        <Rnd
            default={windowObject.defaultRndProps.default}
            size={{
                width:windowObject.rndProps.width,
                height:windowObject.rndProps.height
            }}
            position={{
                x:windowObject.rndProps.x,
                y:windowObject.rndProps.y
            }}
            onDragStart={()=>windowObject.activateWindow()}
            onResizeStart={()=>windowObject.activateWindow()}
            onDragStop={(e,d)=>{
                                windowObject.updateWindowProperty("rndProps",{
                    x:d.x,
                    y:d.y,
                    width:windowObject.rndProps.width,
                    height:windowObject.rndProps.height
                })            
            }}
            onResizeStop={(e,direction, ref, delta, position)=>{
                                windowObject.updateWindowProperty("rndProps",{
                    width: ref.style.width,
                    height: ref.style.height,
                    x:windowObject.rndProps.x,
                    y:windowObject.rndProps.y
                    }
                )            
            }}
            minHeight={windowObject.defaultRndProps.minHeight}
            minWidth={windowObject.defaultRndProps.minWidth}
            bounds=".desktop"            
            dragHandleClassName="window-title-bar"
            style={{zIndex:windowObject.zIndex}}
            >
                <div className={`window animate__animated ${windowObject.animation}`}
                    onClick={()=>{windowObject.activateWindow()}}
                    style={{display:windowObject.minimized?"none":undefined}}>
                        <div className="window-title-bar">
                            <IconContext.Provider value={{ color: "teal", className: "window-title-bar-icon"}}>
                                <windowObject.Icon/>
                            </IconContext.Provider>
                            <div className="window-title-bar-title">
                                {windowObject.name}
                            </div>
                            <div className="window-title-bar-buttons">
                                
                                <div className="window-title-bar-button" onClick={()=>windowObject.closeWindow()}>
                                    <IconContext.Provider value={{  className: "window-title-bar-button-icon"}}>
                                        <VscClose></VscClose>
                                    </IconContext.Provider>                                    
                                </div>

                                <div className="window-title-bar-button" onClick={()=>windowObject.toggleWindowMaximizeRestore()}>
                                    <IconContext.Provider value={{  className: "window-title-bar-button-icon"}}>
                                        {
                                            !windowObject.maximized?
                                                <VscChromeMaximize></VscChromeMaximize>:
                                                <VscChromeRestore></VscChromeRestore>
                                        }
                                    </IconContext.Provider>
                                </div>
                                
                                <div className="window-title-bar-button" onClick={()=>windowObject.minimizeWindow()}>
                                    <IconContext.Provider value={{  className: "window-title-bar-button-icon"}}>
                                        <VscChromeMinimize></VscChromeMinimize>
                                    </IconContext.Provider>
                                </div>

                            </div>
                        </div>
                        <div className="window-content" onContextMenu={e=>e.stopPropagation()}>
                            <windowObject.Content></windowObject.Content>
                        </div>
                        <div className={`${windowObject.windowID}toast`}></div>
                </div>
         </Rnd>                  
    )
}
