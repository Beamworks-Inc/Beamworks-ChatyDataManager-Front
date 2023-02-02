import React from 'react'
import {Button} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import {recognition} from "./SpeechRecognition";

const isSpeechRecognitionSupported = ():boolean => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

const setSpeechRecognition= (isActivate : boolean) => {
    if(!recognition){
        throw new Error("SpeechRecognition is not supported")
    }
    if(isActivate){
        recognition.start()
    } else{
        recognition.stop()
    }

}
/**
 * 받아쓰기 기능을 활성화, 비활성화 할 수 있는 버튼입니다.
 * 브라우저가 음성인식을 사용하지 않는 경우 사용할 수 없습니다.
 * autoVisible 속성을 true로 설정하면 음성인식이 지원되지 않는 경우 버튼이 보이지 않습니다.
 * @param props
 * @constructor
 */
const DictationActivateButton=({autoVisible  = true})=>{
    const [isActivated, setIsActivated] = React.useState(false);
    const isSupported=isSpeechRecognitionSupported()

    if(!isSupported && autoVisible){
        return <></>
    }

    const onClick=()=> {
        if(isSupported){
            setSpeechRecognition(!isActivated)
            setIsActivated(!isActivated)
        }
        else{
            alert("음성인식을 지원하지 않는 브라우저입니다.")
        }
    }

    return (
        <Button onClick={onClick}>
            {isActivated ? <MicIcon/> : <MicOffIcon/>}
        </Button>
    )
}
export default DictationActivateButton