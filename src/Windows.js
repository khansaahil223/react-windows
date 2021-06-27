
import './Windows.css';

import Desktop from './components/WindowsElements/Desktop';
import Taskbar from './components/WindowsElements/Taskbar/Taskbar';
import Startmenu from './components/WindowsElements/Startmenu';
import Animated from './components/Animated';
import Toast from './components/Toast'

import background from './desktop-background.jpg'

import '../node_modules/animate.css/animate.min.css'

import React, { Component } from 'react'
import reactDom from 'react-dom';
export default class Windows extends Component {
    animationTimeOutLength = 200

    constructor(props){
        super(props)
        this.state = {openWindows:[],startMenuShowing:false}        

        this.openWindow = this.openWindow.bind(this)
        this.updateWindowProperty = this.updateWindowProperty.bind(this)
        this.callFnOnOtherWindows = this.callFnOnOtherWindows.bind(this)
        this.removeWindow = this.removeWindow.bind(this)
        this.activateWindow = this.activateWindow.bind(this)
        this.getMaxWindowZIndex = this.getMaxWindowZIndex.bind(this)
        this.closeWindow = this.closeWindow.bind(this)        
        this.getWindowByID = this.getWindowByID.bind(this)                
        this.toggleWindowMaximizeRestore = this.toggleWindowMaximizeRestore.bind(this)        
        this.minimizeWindow = this.minimizeWindow.bind(this)        
        this.setStartMenuShowing = this.setStartMenuShowing.bind(this)        
        this.toast = this.toast.bind(this)        
    }

    toast(windowID,message,duration){
      console.log(document.getElementsByClassName(windowID+"toast")[0])
      reactDom.render(<Toast key={Math.random()} duration={duration} message={message}/>,document.getElementsByClassName(windowID+"toast")[0])      
    }

    openWindow (application){  
          let windowID = `window${this.state.openWindows.length+1}`

          const {name,Icon,Content,rndProps} = application

          if(this.state.openWindows.map((w=>{return w.name})).indexOf(name)!==-1){
            //prevent duplicate windows from opening
              let alreadyOpenWindow = this.state.openWindows.filter((w)=>{return w.name===name})[0]
              console.log(alreadyOpenWindow)
              this.activateWindow(alreadyOpenWindow.windowID)
              if(alreadyOpenWindow.minimized===true){
                this.updateWindowProperty(alreadyOpenWindow.windowID,"animation","animate__fadeInBottomLeft")
                this.updateWindowProperty(alreadyOpenWindow.windowID,"minimized",false)              
              }     
              else{
                this.updateWindowProperty(alreadyOpenWindow.windowID,"animation","")
                this.updateWindowProperty(alreadyOpenWindow.windowID,"animation","animate__jackInTheBox")
              }       
              return
          }
      const windowObject = {
            windowID:windowID,
            name:name,
            Icon:Icon,
            animation:"animate__fadeInBottomLeft",
            minimized:false,
            maximized:false,
            defaultRndProps:rndProps,
            rndProps:rndProps.default, 
            prevRndProps:rndProps.default,                                   
            active:true,
            visible:true,
            Content:()=>{return <Content toast={(message,duration)=>{this.toast(windowID,message,duration)}}/>},
            updateWindowProperty:(property,value)=>{this.updateWindowProperty(windowID,property,value)},
            closeWindow:()=>{this.closeWindow(windowID)},
            activateWindow:()=>{this.activateWindow(windowID)},            
            toggleWindowMaximizeRestore:()=>{this.toggleWindowMaximizeRestore(windowID)},
            minimizeWindow:()=>{this.minimizeWindow(windowID)},  
            toast:(message,duration)=>{this.toast(windowID,message,duration)}         
        }

        if(this.state.openWindows.length>0)
          windowObject.zIndex=this.getMaxWindowZIndex()+1
        else
          windowObject.zIndex=1
                     
        this.setState({openWindows:[...this.state.openWindows,windowObject]})
    }
     updateWindowProperty(windowID,property,value){       
            this.setState({
          openWindows:this.state.openWindows.map(w=>{
              if(w.windowID===windowID){                                                
                w[property]=value              
              }
                return w
              })
          })
      }

     callFnOnOtherWindows(windowID,fn,...params){     
        this.state.openWindows.filter(
          (w)=>{
            return w.windowID!==windowID
          }).forEach(
            (w)=>{              
                fn(w.windowID,...params)
            })
    }
     removeWindow (windowID){    
            this.setState({openWindows:this.state.openWindows.filter(w=>{
            return w.windowID!==windowID                                              
        })})
    }
     activateWindow (windowID){    
              let max = this.getMaxWindowZIndex()
        this.updateWindowProperty(windowID,"zIndex",max+1)
        this.updateWindowProperty(windowID,"active",true)
        this.callFnOnOtherWindows(windowID,this.updateWindowProperty,"active",false)
        
    }
   getMaxWindowZIndex  (){
          let max = 0
      this.state.openWindows.forEach(window => {
        if(window.zIndex>max)
          max = window.zIndex
      });
            return max
  }

  closeWindow (windowID){   
        this.updateWindowProperty(windowID,"animation","animate__hinge")
    setTimeout(()=>{        
      this.removeWindow(windowID)                                     
    },this.animationTimeOutLength)
}

  getWindowByID (windowID){
      return this.state.openWindows.filter(w=>{return w.windowID===windowID})[0]
  }

    toggleWindowMaximizeRestore (windowID){   
        const currentWindow = this.getWindowByID(windowID)    
        
        if(currentWindow.rndProps.height==="94vh"){
            //restore Window here  
            this.updateWindowProperty(windowID,"animation","animate__jackInTheBox")
            this.updateWindowProperty(windowID,"maximized",false)            
            this.updateWindowProperty(windowID,"rndProps",{
                x : currentWindow.prevRndProps.x,
                y : currentWindow.prevRndProps.y,
                width : currentWindow.prevRndProps.width,
                height: currentWindow.prevRndProps.height
            })               
        }
        else {
            //Maximize Window here              
            this.updateWindowProperty(windowID,"animation","animate__zoomIn")
            this.updateWindowProperty(windowID,"maximized",true)  
            this.updateWindowProperty(windowID,"prevRndProps", currentWindow.rndProps)        
            this.updateWindowProperty(windowID,"rndProps",{
                x:0,
                y:0,
                width:"100vw",
                height:"94vh"
            })                              
        }
    }

    minimizeWindow (windowID) {           
      this.updateWindowProperty(windowID,"animation","animate__fadeOutBottomLeft")        
        setTimeout(()=>{
          this.updateWindowProperty(windowID,"minimized",true)    
        },this.animationTimeOutLength)
    }   

    setStartMenuShowing(startMenuShowing){
      this.setState({startMenuShowing:startMenuShowing})
    }

    render() {
        return (
            <div className="Windows" style={{backgroundImage:`url(${background})`}} onContextMenu={(e)=>e.preventDefault()}>
                <Desktop openWindows={this.state.openWindows} setStartMenuShowing={this.setStartMenuShowing} />   
                <Animated 
                    animationIn="animate__fadeInUp" 
                    animationOut="animate__fadeOutDown"         
                    isVisible={this.state.startMenuShowing}
                    className="start-menu-animation"
                    >
                    <Startmenu openWindow={this.openWindow} setStartMenuShowing={this.setStartMenuShowing} />
                </Animated>          
                                
                <Taskbar
                    openWindows={this.state.openWindows} 
                    startMenuShowing={this.state.startMenuShowing} setStartMenuShowing={this.setStartMenuShowing}
                    updateWindowProperty={this.updateWindowProperty}             
                />
            </div>
        )
    }
}
