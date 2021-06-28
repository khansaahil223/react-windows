import { AiFillCalculator } from "react-icons/ai";
import { FaLanguage } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";

import Calculator from "./Apps/Calculator";
import LanguageLearner from "./Apps/LangaugeLearner/LanguageLearner";
import TodoListApp from "./Apps/TodoListApp";

export const InstalledApplications = [
    {
        name:"Calculator",
        Icon:AiFillCalculator,
        Content:Calculator,
        rndProps:{
            default:{
                x: 215,
                y: 35,
                width: 300,
                height: 500,
            },
            minWidth: 250,
            minHeight:200
        }
    },
    {
        name:"Todo List",
        Icon:FcTodoList,
        Content:TodoListApp,
        rndProps:{            
                default:{
                x: 315,
                y: 335,
                width: 450,
                height: 500,
                },
                minWidth: 250,
                minHeight:200            
        }
    },
    {
        name:"Language Learning",
        Icon:FaLanguage,
        Content:LanguageLearner,
        rndProps:{
            default:{
                x:400,
                y:180,
                width:600,
                height:500                    
            },
            minWidth:400,
            minHeight:300
        }      
    }
]