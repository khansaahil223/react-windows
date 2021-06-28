import React from 'react'

import './Taskbar.css'

import { IconContext } from "react-icons";

import windowsLogo from '../../../windows-logo.svg'
import TaskbarWindowPreview from './TaskbarWindowPreview';

export default class Taskbar extends React.Component {
    openWindows
    startMenuShowing
    setStartMenuShowing
     
    constructor(props){
        super(props)                
        this.state = {
            showTaskbarPreview:false,
            taskbarPreviewWindows:[],
            taskbarPreviewStyles:{}
        }
    }
    uniqueWindowNames = []

    componentDidMount(){
        
    }

    componentDidUpdate(){
        this.uniqueWindowNames = []
    }

    render(){
        return (
                <div className="taskbar">
                {
                    this.state.showTaskbarPreview?
                        <TaskbarWindowPreview windows={this.state.taskbarPreviewWindows} styles={this.state.taskbarPreviewStyles} />
                    : null
                }
                        <div className="taskbar-button"                            
                            onClick={()=>{                                                          
                                this.props.setStartMenuShowing(!this.props.startMenuShowing)                             
                            }}
                        >
                        <img src={windowsLogo} alt="GO"/>
                        </div>
                        <div className="taskbar-icons">
                        {
                            this.props.openWindows.map(window=>{                                
                                if(this.uniqueWindowNames.indexOf(window.name) === -1)
                                {
                                    this.uniqueWindowNames = this.uniqueWindowNames.concat(window.name)
                                    let style = {}
                                    if(window.active===true){
                                        style={boxShadow: "#cddc39 0px 0px 0px 10px"}
                                    }
                                    return  <IconContext.Provider 
                                                value={{ color: "gold", className: "taskbar-icon",style:style}} 
                                                key={window.windowID} 
                                                >
                                                <window.Icon onClick={()=>{
                                                    this.setState({showTaskbarPreview:true})
                                                    if(window.minimized===true){
                                                        window.updateWindowProperty("animation","animate__fadeInBottomLeft")
                                                        window.updateWindowProperty("minimized",!window.minimized)
                                                        window.activateWindow()
                                                    }
                                                    else if(window.minimized===false){
                                                        window.updateWindowProperty("animation","animate__fadeOutBottomLeft")
                                                        setTimeout(()=>window.updateWindowProperty("minimized",!window.minimized),0)
                                                    }
                                                }}/>
                                            </IconContext.Provider>
                                }
                                return null
                            })
                        }
                    </div>
                </div>
        )
    }
}