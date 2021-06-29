import React from 'react'

import './Home.css'

export default function Home(props) {

    const {changePage,pages} = props    

    return (
        <div className="language-learner-home">
            <div className="language-learner-home-grid">
                {
                    pages.map((page)=>{
                        return <div className="language-learner-home-grid-item" onClick={()=>{changePage(page)}} key={page}>
                        {page}</div>
                    })
                }
            </div>
        </div>
    )
}
