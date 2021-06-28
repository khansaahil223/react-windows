/* eslint-disable no-eval */
import React from 'react'

import './Calculator.css'

import {FaBackspace} from 'react-icons/fa'

export default class Calculator extends React.Component {

    constructor(props){
        super(props)

        this.state = {displayText:"0",fullOperation:"",allowConcat:true,allowDot:true}

        this.handleKeyInput = this.handleKeyInput.bind(this)
    }       

    handleKeyInput(keyText) {
        const setDisplayText = (displayText)=>{
            this.setState({displayText:displayText})
        }
        const setFullOperation = (fullOperation)=>{
            this.setState({fullOperation:fullOperation})
        }        
        const setAllowConcat = (allowConcat)=>{
            this.setState({allowConcat:allowConcat})
        }                   

        const displayText = this.state.displayText
        const fullOperation = this.state.fullOperation        
        const allowConcat = this.state.allowConcat                      

        const clearFullOperationOnEquals = ()=>{
            if(fullOperation[fullOperation.length-1]==="="){
                setFullOperation('')
            }
        }

        if(keyText==="0" || keyText==="1"|| keyText==="2"|| keyText==="3"|| keyText==="4"|| keyText==="5"|| keyText==="6"
        || keyText==="7"|| keyText==="8"|| keyText==="9") {
            if(allowConcat===true){
                setDisplayText(Number.parseFloat(displayText.concat(keyText)).toString())
            }
            else{
                setFullOperation("")
                setDisplayText(keyText)
                setAllowConcat(true)
            }
        }
        if(keyText==="del"){
            if(displayText.length>1)
                setDisplayText(displayText.slice(0,displayText.length-1))
            else
                setDisplayText("0")
        }
        if(keyText==="+" || keyText==='-' || keyText==="/" || keyText==="*"){  
            const operation = keyText==="*"?"x":keyText 
            if(allowConcat===false){//after full result                
                setFullOperation(displayText.concat(operation))
                setDisplayText("0")
                setAllowConcat(true)
            }
            else{
                if(displayText==="0"){
                    //change operation
                    if(fullOperation==="")
                        return
                    setFullOperation(fullOperation.slice(0,fullOperation.length-1).concat(operation))
                }
                else{
                    //move display text above along with operation
                    setFullOperation(fullOperation.concat(displayText.concat(operation)))
                    setDisplayText("0")
                }
            }                
                
                    
        }
        if(keyText==="clear"){
            setDisplayText("0")
            setFullOperation("")
            
        }
        if(keyText==="CE"){
            setDisplayText("0")    
            
            clearFullOperationOnEquals()
        }
        if(keyText==="="){
            const expression = fullOperation.concat(displayText).replaceAll("x","*")    
            if(fullOperation[fullOperation.length-1]==="=")//prevent duplicate equals   
                return
            if(expression.indexOf(".")===-1){ // no floating points
                setDisplayText(eval(expression).toString())
            }
            else{
                setDisplayText(eval(expression).toFixed(2).toString())
            }
            setFullOperation(expression.replaceAll("*","x")+"=")
            setAllowConcat(false)
            
        }
        if(keyText==="signChange") {
            if(displayText!=="0")
                setDisplayText("-"+displayText)
        }        
        if(keyText===".") {
            if(displayText.indexOf(".")===-1){
                setDisplayText(displayText+".")
                
            }
        } 
        const sigleOperateDisplayText = (expression,fixed=2) =>{
            clearFullOperationOnEquals()
            setDisplayText(eval(expression).toFixed(fixed).toString())
            setAllowConcat(false)
        }
        if(keyText==="%") {
            sigleOperateDisplayText(displayText.concat("/100"))            
        }
        if(keyText==="reciprocal"){    
            sigleOperateDisplayText("1/"+displayText)            
        }
        if(keyText==="square root"){    
            sigleOperateDisplayText(`Math.sqrt(${eval(displayText)})`)            
        }
        if(keyText==="square"){
            if(displayText.indexOf(".")===-1)
                sigleOperateDisplayText(displayText+"*"+displayText,0)
            else
                sigleOperateDisplayText(displayText+"*"+displayText)
        }
    }

    render(){
        const displayText = this.state.displayText
        const fullOperation = this.state.fullOperation

        return (
            <div className="calculator" tabIndex={-1}   
                onKeyDown={(e)=>{  
                    console.log(e.code)                        
                    if(e.code==="Digit0" || e.code==="Numpad0") {                
                        this.handleKeyInput("0")
                    }
                    if(e.code==="Digit1" || e.code==="Numpad1") {                
                        this.handleKeyInput("1")
                    }
                    if(e.code==="Digit2" || e.code==="Numpad2") {                
                        this.handleKeyInput("2")
                    }
                    if(e.code==="Digit3" || e.code==="Numpad3") {                
                        this.handleKeyInput("3")
                    }
                    if(e.code==="Digit4" || e.code==="Numpad4") {                
                        this.handleKeyInput("4")
                    }
                    if(e.code==="Digit5" || e.code==="Numpad5") {                
                        this.handleKeyInput("5")
                    }
                    if(e.code==="Digit6" || e.code==="Numpad6") {                
                        this.handleKeyInput("6")
                    }
                    if(e.code==="Digit7" || e.code==="Numpad7") {                
                        this.handleKeyInput("7")
                    }
                    if(e.code==="Digit8" || e.code==="Numpad8") {                
                        this.handleKeyInput("8")
                    }
                    if(e.code==="Digit9" || e.code==="Numpad9") {                
                        this.handleKeyInput("9")
                    }
                    if(e.code==="Backspace") {
                        this.handleKeyInput("del")
                    }
                    if(e.code==="Delete" || e.code==="Escape"){
                        this.handleKeyInput("clear")
                    }
                    if(e.code==="Add" || e.code==="NumpadAdd"){
                        this.handleKeyInput("+")
                    }
                    if(e.code==="Minus" || e.code==="NumpadSubtract"){
                        this.handleKeyInput("-")
                    }
                    if(e.code==="KeyX" || e.code==="NumpadMultiply"){
                        this.handleKeyInput("*")
                    }
                    if(e.code==="Period" || e.code==="NumpadDecimal"){
                        this.handleKeyInput(".")
                    }
                    if(e.code==="Enter" || e.code==="NumpadEnter"){
                        this.handleKeyInput("=")
                    }
                }}  
            >
                <div className="calculator-display-full-operation">{fullOperation}</div>
                <div className="calculator-display-text">{displayText}</div>
                <div className="calculator-buttons">
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("%")}}>%</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("CE")}}>CE</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("clear")}}>C</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("del")}}><FaBackspace></FaBackspace></div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("reciprocal")}}>1/x</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("square")}}>x<sup style={{position:"relative",bottom:"5px"}}>2</sup></div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("square root")}}>sqrt</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("/")}}>/</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("7")}}>7</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("8")}}>8</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("9")}}>9</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("*")}}>x</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("4")}}>4</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("5")}}>5</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("6")}}>6</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("-")}}>-</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("1")}}>1</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("2")}}>2</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("3")}}>3</div>
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("+")}}>+</div>                
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("signChange")}}>+/-</div>                
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("0")}}>0</div>                
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput(".")}}>.</div>                
                    <div className="calculator-button" onClick={()=>{this.handleKeyInput("=")}}>=</div>                
                </div>
            </div>
        )
    }
    
}