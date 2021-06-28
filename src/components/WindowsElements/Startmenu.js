import React/* ,{useState} */ from 'react'

import './Startmenu.css'

import { InstalledApplications } from '../GlobalVariables'

export default function Startmenu(props) {

    const {
        setStartMenuShowing,
        openWindow
    } = props

    return (
    <div className="start-menu" style={{bottom:0}}>
        <div className="start-menu-left">
            <div className="start-menu-app-list">
            {
                InstalledApplications.map(((ia,index)=>{
                    return <div key={index} className="start-menu-app-list-item" onClick={
                        ()=>{
                                openWindow(ia)
                                setStartMenuShowing(false)
                            }
                        }>{ia.name}</div>
                }))
            }
                {/* <li onClick={()=>{
                    openWindow("Calculator",AiFillCalculator,Calculator,{default:{
                    x: 215,
                    y: 35,
                    width: 300,
                    height: 500,
                    },minWidth: 250,minHeight:200})
                    setStartMenuShowing(false)
                    }
                    }>Calculator</li>
                <li onClick={()=>{
                    openWindow("Todo List",FcTodoList,TodoListApp,{default:{
                    x: 315,
                    y: 335,
                    width: 450,
                    height: 500,
                    },minWidth: 250,minHeight:200})
                    setStartMenuShowing(false)
                    }
                    }>Todo List</li> */}
            </div>
        </div>
        <div className="start-menu-right">

        </div>
    </div>
    )
}