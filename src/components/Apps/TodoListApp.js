import React, { useState } from 'react'

import './TodoListApp.css'

import {MdCheckBox,MdCheckBoxOutlineBlank,MdIndeterminateCheckBox} from 'react-icons/md'

export default function TodoListApp() {
    const [items, setItems] = useState([])

    const [todoInput, setTodoInput] = useState("")

    return (
        <div className="todo-app">
            <div className="todo-add-holder">                
                <input className="todo-add-input" value={todoInput} onChange={(e)=>setTodoInput(e.target.value)}></input>
                <div className="todo-add-button" onClick={()=>{
                    if(todoInput.length>0){
                        setItems([...items,{text:todoInput,id:items.length+1,checked:false}])
                        setTodoInput("")
                    }
                    }
                }>+</div>
            </div>

            <div className="todo-items-holder">
            {
                items.length<1?"Start adding Todos above!":""
            }
            {
                items.map((item)=>{
                    return <div key={item.id} className="todo-item-holder">
                                <div className="todo-item-checkbox" onClick={()=>{setItems(items.map(i=>{if(i.id===item.id)i.checked=!i.checked;return i;}))}}>{item.checked?<MdCheckBox/>:<MdCheckBoxOutlineBlank/>}</div>                            
                                <div className="todo-item">{item.text}</div>
                                <div className="todo-item-button" onClick={()=>{setItems(items.filter(i=>{return i.id!==item.id}))}}>X</div>
                        </div>
                })
            }
            </div>
        </div>
    )
}
