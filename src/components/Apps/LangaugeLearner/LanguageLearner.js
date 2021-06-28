import React from 'react'

import "./LanguageLearner.css"

import Home from './Home'

import {GiHamburgerMenu} from 'react-icons/gi'
import Dictionary from './Dictionary'
import Reading from './Reading'
import VocabularyCards from './VocabularyCards'

export default class LanguageLearner extends React.Component {
    
    pages = ["home","dictionary","reading","vocabulary cards"]

    constructor(props){
        super(props)
        this.state={currentPage:"home",showSidebar:false,sidebarAnimation:"animate__zoomOutLeft"}
    }

    render(){
        return <div className = "language-learner">
            <div className="language-learner-hamburger" 
                onClick={()=>
                    {
                        let duration
                        if(this.state.sidebarAnimation==="animate__zoomInLeft")
                            duration = 200
                        else
                            duration = 0
                        this.setState({
                            sidebarAnimation:this.state.sidebarAnimation==="animate__zoomInLeft"?"animate__zoomOutLeft":"animate__zoomInLeft"                                                       
                        })
                        setTimeout(()=>this.setState({showSidebar:!this.state.showSidebar}),duration) 
                    }
                }>
                <GiHamburgerMenu></GiHamburgerMenu>
            </div>
            {
                this.state.showSidebar?
                <div className={`language-learner-sidebar animate__animated ${this.state.sidebarAnimation}`}>
                    <div className="language-learner-sidebar-items">
                        {
                            this.pages.map((page)=>{
                                return <div className="language-learner-sidebar-item" 
                                onClick={
                                    ()=>{                                    
                                        this.setState({currentPage:page,sidebarAnimation:"animate__zoomOutLeft"}) 
                                        setTimeout(()=>this.setState({showSidebar:false}),200)                                                                               
                                        }
                                }
                                key={page}
                                >{page}</div>
                            })
                        }
                    </div>
                </div>
                :null
            }        
            <div className="language-learner-content" style={this.state.showSidebar?{width:"67%",left:"34%"}:{width:"100%",left:0}}>
            {
                {
                    'home':<Home changePage={(page)=>this.setState({currentPage:page})} pages={this.pages} toast={this.props.toast}></Home>,
                    'dictionary':<Dictionary toast={this.props.toast}></Dictionary>,
                    "reading":<Reading toast={this.props.toast}></Reading>,
                    'vocabulary cards':<VocabularyCards toast={this.props.toast}/>
                }[this.state.currentPage]
            }
            </div>            
        </div>        
    }
}