
import './Android.css';

import background from './android-background.jpg'

import '../node_modules/animate.css/animate.min.css'

import React, { Component } from 'react'

import Homescreen from './components/AndroidElements/Homescreen';
import AndroidBottomBar from './components/AndroidElements/AndroidBottomBar';

import Toast from './components/Toast'

import reactDom from 'react-dom';
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

          const {name,Icon,Content} = application

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

    toast(message,duration){      
      reactDom.render(<Toast key={Math.random()} duration={duration} message={message} style={{width:"200px",fontSize: "medium"}}/>,
        document.getElementsByClassName("toast-holder")[0])      
    }

    render() {
        return (
            <div className="Android" style={{backgroundImage:`url(${background})`}} onContextMenu={(e)=>e.preventDefault()}>
                <div className="android-app-content" style={{background:this.state.currentApp===Homescreen?"inherit":undefined}}>
                    <this.state.currentApp openApp={this.openApp} toast={this.toast}/>
                    <div className="toast-holder"></div>
                </div>                
                <div className="android-bottom-bar">
                    <AndroidBottomBar goHome={this.goHome}></AndroidBottomBar>
                </div>                
            </div>
        )
    }
}
