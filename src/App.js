import React, { useState } from 'react'

import Android from './Android'
import Windows from './Windows'

export default function App() {    

    const [screenWidth, setScreenWidth] = useState(visualViewport.width)

    visualViewport.addEventListener("resize",()=>{setScreenWidth(visualViewport.width)})
    
    return <React.Fragment>
        {
            screenWidth<500?<Android></Android>:<Windows></Windows>
        }
    </React.Fragment>    
}
