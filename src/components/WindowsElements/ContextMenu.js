import React from 'react'
import './ContextMenu.css'
export default function ContextMenu(props) {
    const {
        buttons,
        styles,
        setVisibility       
    } = props

    return (
        <div className="context-menu" 
             style={styles} 
             onClick={e=>e.stopPropagation()}
             onContextMenu={e=>{
                 e.stopPropagation()
                 e.preventDefault()
             }}
             >
            {
                buttons.map((button,index)=>{
                    return <div key={index} className={`context-menu-button ${button.className?button.className:""}`} 
                            onClick={()=>{
                                button.onClick()
                                setVisibility(false)
                            }}>
                        {button.text}
                    </div>
                })
            }
        </div>
    )
}
