import { AiFillAccountBook } from "react-icons/ai"
import Window from "./components/Window"

const window = {
    windowID:2,
    animation:"animate__fadeOutDown",
    minimized:false,
    maximized:true,
    icon:AiFillAccountBook,
    name:"Calculator",
    rndDefault:{
        x: 215,
        y: 35,
        width: 300,
        height: 500,
    },
    element:<Window></Window>
}