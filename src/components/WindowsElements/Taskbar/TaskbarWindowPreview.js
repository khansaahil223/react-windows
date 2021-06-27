import React from 'react'
import './TaskbarWindowPreview.css'

export default function TaskbarWindowPreview(props) {
    const {
        windows,
        styles,
        //setVisibility
    } = props

    return (
        <div className="taskbar-window-preview"
             style={styles}
             onClick={e=>e.stopPropagation()}
             onContextMenu={e=>{
                 e.stopPropagation()
                 e.preventDefault()
             }}
             >
            {
                windows.map((Window,index)=>{
                    return <Window key={index}></Window>
                })
            }
        </div>
    )
}