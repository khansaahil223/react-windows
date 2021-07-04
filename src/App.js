import React, { useState } from 'react'

import Android from './Android'
import Windows from './Windows'

export default function App() {    

    // const visualViewport = Window.visualViewport
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    window.addEventListener("resize",()=>{setScreenWidth(window.innerWidth)})
    
    return <React.Fragment>
        {
            screenWidth<500?<Android></Android>:<Windows></Windows>
        }
    </React.Fragment>    
}
