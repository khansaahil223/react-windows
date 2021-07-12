import React, { useEffect, useState } from 'react'

import Android from './Android'
import Windows from './Windows'

import firebase from 'firebase/app'

export default function App() {    

    useEffect(()=>{
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyBJC3UM36FOfXZWr3NoWt6BM0D-1d7e-i4",
            authDomain: "react-windows-simulation.firebaseapp.com",
            databaseURL: "https://react-windows-simulation-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "react-windows-simulation",
            storageBucket: "react-windows-simulation.appspot.com",
            messagingSenderId: "607516217039",
            appId: "1:607516217039:web:39905be1a32268f7b931ba",
            measurementId: "G-CZG5D4SD0L"
        };
        if(!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)        
        else
            firebase.app()
    },[])    
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    window.addEventListener("resize",()=>{setScreenWidth(window.innerWidth)})
    
    return <React.Fragment>
        {
            screenWidth<500?<Android></Android>:<Windows></Windows>
        }
    </React.Fragment>    
}
