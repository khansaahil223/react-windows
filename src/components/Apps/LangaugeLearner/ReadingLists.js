import React, { useEffect, useState } from 'react'

import firebase from 'firebase/app'
import 'firebase/database'

export default function ReadingLists(props) {

    const [readingList, setReadingList] = useState()

    useEffect(()=>{
        var database = firebase.database();
        database.ref("readingList").on('value',(snapshot)=>{
            const data = snapshot.val()                              
            setReadingList(Object.keys(data).map(id=>{return data[id]}))
        })
    },[])

    return (
        <div className="language-learner-readinglists-list">
            {
                readingList && readingList.map(readingData=>{
                    return (
                        <div 
                            className="language-learner-readinglists-list-item" 
                            onClick={()=>{
                                localStorage.setItem("currentReading",JSON.stringify({title:readingData.title,content:readingData.content}))
                                props.changePage("reading")
                            }}
                            key={readingData.title}
                            >

                            {readingData.title}

                        </div>
                    )
                })
            }
        </div>
    )
}
