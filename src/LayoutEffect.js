import {useEffect, useState} from "react";

function LayoutEffect(){
    const [count, setCount] = useState(0);

    useEffect(()=>{
        if (count > 3)
            setCount(0);
    },[count])

    const handleRun = ()=>
}