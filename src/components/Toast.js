import React, { useEffect, useState } from 'react'
import './Toast.css'
export default function Toast(props) {
    const {duration,message} = props

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, duration);               
    }, [duration])

    if(visible )
        return (
            <div className="toast animate__animated animate__bounceInUp" style={props.style}>
                {message}
            </div>
        )
    else
        return null
}
