import React from 'react'

export default function Animated(props) {
    const {
        animationIn,
        animationOut,         
        isVisible,
        className,
        children
    } = props

    let animation

    if(isVisible)
        animation = animationIn
    else
        animation = animationOut    

    return (
        <div className={`${className} animate__animated ${animation}`}>
            {isVisible?children:null}
        </div>
    )
}
