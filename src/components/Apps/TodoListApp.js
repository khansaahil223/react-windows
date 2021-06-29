import React, { useState } from 'react'

import './TodoListApp.css'

import {MdCheckBox,MdCheckBoxOutlineBlank,/* MdIndeterminateCheckBox */} from 'react-icons/md'

export default function TodoListApp() {
    let todosLocalStorage = localStorage.getItem("todos")

    const [items, setItems] = useState(todosLocalStorage?JSON.parse(todosLocalStorage):[])

    const [todoInput, setTodoInput] = useState("")

    const saveTodo = (todoItem)=>{
        let todos = localStorage.getItem("todos")
        if(!todos){
            console.log(JSON.stringify([todoItem]))
            localStorage.setItem("todos",JSON.stringify([todoItem]))
            setItems([todoItem])
        }
        else{
            todos = JSON.parse(todos).concat(todoItem)
            localStorage.setItem("todos",JSON.stringify(todos))
            setItems(todos)
        }
    }

    const toggleChecked = (todoItem) => {
        let todos = localStorage.getItem("todos")
        if(!todos)
            return
        todos = JSON.parse(todos)
        todos = todos.map(i=>{
            if(i.id===todoItem.id)
                i.checked=!i.checked;
            return i;
            })
        setItems(todos)
        localStorage.setItem("todos",JSON.stringify(todos))
    }

    return (
        <div className="todo-app">
            <div className="todo-add-holder">                
                <input className="todo-add-input" value={todoInput} 
                    onChange={(e)=>setTodoInput(e.target.value)} placeholder="Enter text here..."></input>
                <div className="todo-add-button" onClick={()=>{
                    if(todoInput.length>0){
                        saveTodo({
                            text:todoInput,
                            id:items.length+1,
                            checked:false
                        })                        
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
                                <div className="todo-item-holder-top-row">
                                    
                                    <div className="todo-item-checkbox" 
                                        onClick={
                                            ()=>{
                                                    toggleChecked(item)
                                                }
                                        }>                                        
                                        {item.checked?<MdCheckBox/>:<MdCheckBoxOutlineBlank/>}
                                    </div>


                                    <div className="todo-item-button" onClick={()=>{setItems(items.filter(i=>{return i.id!==item.id}))}}>X</div>
                                </div>
                                <div className="todo-item">{item.text}</div>                                
                        </div>
                })
            }
            </div>
        </div>
    )
}
