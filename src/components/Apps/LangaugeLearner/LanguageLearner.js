import React from 'react'

import "./LanguageLearner.css"

import Home from './Home'

import {GiHamburgerMenu} from 'react-icons/gi'
import Dictionary from './Dictionary'
import Reading from './Reading'
import VocabularyCards from './VocabularyCards'
import LanguageSelect from './LanguageSelect'
import Hover from './Hover'
import ReadingLists from './ReadingLists'

import firebase from 'firebase/app'

export default class LanguageLearner extends React.Component {
    
    pages = ["home","dictionary","reading","vocabulary cards","reading lists"]
    pagesIcon = []
    
    constructor(props){
        super(props)        
        this.state={
            currentPage:"home",
            showSidebar:false,
            sidebarAnimation:"animate__zoomOutLeft",                        
            showHover:false,
            hoverAnimation:"animate__pulse"
        }        

        firebase.database().ref("languages").on('value',snapshot=>{
            const data = snapshot.val()
            this.state.knownLanguage = data.known
            this.state.studyLanguage = data.study
        })        

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


            <LanguageSelect studyLanguage={this.state.studyLanguage} setStudyLanguage={(val)=>{this.setState({studyLanguage:val})}}
                            knownLanguage={this.state.knownLanguage} setKnownLanguage={(val)=>{this.setState({knownLanguage:val})}}/>

            {
                this.state.showHover?<Hover word={this.state.hoverWord} 
                                            knownLanguage={this.state.knownLanguage}
                                            studyLanguage={this.state.studyLanguage}
                                            setHoverWord={(val)=>{this.setState({hoverWord:val})}}
                                            setShowHover={(val)=>{this.setState({showHover:val})}}
                                            hoverAnimation={this.state.hoverAnimation}
                                            setHoverAnimation={(val)=>{this.setState({hoverAnimation:val})}}
                                            toast={this.props.toast}
                                            ></Hover>:null
            }
            <div className="language-learner-content" style={this.state.showSidebar?{width:"67%",left:"34%"}:{width:"100%",left:0}}>
            {
                {
                    'home':<Home changePage={(page)=>this.setState({currentPage:page})}                         
                                    pages={this.pages} 
                                    toast={this.props.toast}
                                    studyLanguage={this.state.studyLanguage} knownLanguage={this.state.knownLanguage}
                                    setShowHover={(val)=>{this.setState({showHover:val})}}
                                    hoverAnimation={this.state.hoverAnimation}
                                    setHoverAnimation={(val)=>{this.setState({hoverAnimation:val})}}
                                    setHoverWord={(val)=>{this.setState({hoverWord:val})}}
                                    ></Home>,
                    'dictionary':<Dictionary toast={this.props.toast} 
                            studyLanguage={this.state.studyLanguage} 
                            knownLanguage={this.state.knownLanguage}
                            setShowHover={(val)=>{this.setState({showHover:val})}}
                            hoverAnimation={this.state.hoverAnimation}
                            setHoverAnimation={(val)=>{this.setState({hoverAnimation:val})}}
                            setHoverWord={(val)=>{this.setState({hoverWord:val})}}
                            />,
                    "reading":<Reading toast={this.props.toast} 
                                studyLanguage={this.state.studyLanguage} 
                                knownLanguage={this.state.knownLanguage}
                                setShowHover={(val)=>{this.setState({showHover:val})}}
                                hoverAnimation={this.state.hoverAnimation}
                                setHoverAnimation={(val)=>{this.setState({hoverAnimation:val})}}
                                setHoverWord={(val)=>{this.setState({hoverWord:val})}}
                                />,
                    'vocabulary cards':<VocabularyCards toast={this.props.toast} 
                                            studyLanguage={this.state.studyLanguage} 
                                            knownLanguage={this.state.knownLanguage}
                                            setShowHover={(val)=>{this.setState({showHover:val})}}
                                            hoverAnimation={this.state.hoverAnimation}
                                            setHoverAnimation={(val)=>{this.setState({hoverAnimation:val})}}
                                            setHoverWord={(val)=>{this.setState({hoverWord:val})}}
                                            />,
                    'reading lists':<ReadingLists toast={this.props.toast} 
                                            studyLanguage={this.state.studyLanguage} 
                                            knownLanguage={this.state.knownLanguage}
                                            setShowHover={(val)=>{this.setState({showHover:val})}}
                                            hoverAnimation={this.state.hoverAnimation}
                                            setHoverAnimation={(val)=>{this.setState({hoverAnimation:val})}}
                                            setHoverWord={(val)=>{this.setState({hoverWord:val})}}
                                            changePage={(page)=>this.setState({currentPage:page})}
                                            />
                }[this.state.currentPage]
            }
            </div>            
        </div>        
    }
}