
import './Android.css';

import Taskbar from './components/WindowsElements/Taskbar/Taskbar';

import background from './android-background.jpg'

import '../node_modules/animate.css/animate.min.css'

import React, { Component } from 'react'

import Homescreen from './components/AndroidElements/Homescreen';
import AndroidBottomBar from './components/AndroidElements/AndroidBottomBar';
export default class Android extends Component {

    animationTimeOutLength = 200

    constructor(props){
        super(props)
        this.state = {openApps:[],currentApp:Homescreen}        
        
        this.openApp =this.openApp.bind(this)
        this.goHome =this.goHome.bind(this)
    }    

    openApp (application){  
          let appID = `app${this.state.openApps.length+1}`

          const {name,Icon,Content,rndProps} = application

          this.setState({currentApp:application.Content})
          const appObject = {
              appID:appID,
              name:name,
              Icon:Icon,              
              Content:Content,              
            }        
                     
        this.setState({openApps:[...this.state.openApps,appObject]})
    }       

    goHome(){
        this.setState({currentApp:Homescreen})
    }

    render() {
        return (
            <div className="Android" style={{backgroundImage:`url(${background})`}} onContextMenu={(e)=>e.preventDefault()}>
              <div className="android-app-content" style={{background:this.state.currentApp===Homescreen?"inherit":undefined}}>
                  <this.state.currentApp openApp={this.openApp}/>
              </div>                
              <div className="android-bottom-bar">
                  <AndroidBottomBar goHome={this.goHome}></AndroidBottomBar>
              </div>
            </div>
        )
    }
}
