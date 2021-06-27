import React/* ,{useState} */ from 'react'

import './Startmenu.css'

import { InstalledApplications } from '../GlobalVariables'

export default function Startmenu(props) {

    const {
        setStartMenuShowing,
        openWindow
    } = props

    return (
    <div className="start-menu" >
        <div className="start-menu-left">
            <ul>
            {
                InstalledApplications.map(((ia,index)=>{
                    return <li key={index} onClick={
                        ()=>{
                                openWindow(ia)
                                setStartMenuShowing(false)
                            }
                        }>{ia.name}</li>
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
            </ul>
        </div>
        <div className="start-menu-right">

        </div>
    </div>
    )
}