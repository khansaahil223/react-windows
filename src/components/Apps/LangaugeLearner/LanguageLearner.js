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
        this.state={currentPage:"home",showSidebar:false,sidebarAnimation:"animate__zoomInLeft"}
    }

    render(){
        return <div className = "language-learner">
            <div className="language-learner-hamburger" onClick={()=>{this.setState({showSidebar:!this.state.showSidebar})}}>
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
                                        this.setState({currentPage:page})
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