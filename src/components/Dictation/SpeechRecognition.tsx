export const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)

if(recognition){
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'ko-KR'
    recognition.onresult = (event) => {
        const focusedComponent = getFocusedComponent()
        const isTextAreaFocused = isTextArea(focusedComponent)
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            console.log(transcript)
            if (event.results[i].isFinal) {
                interimTranscript=transcript
            } else {
                interimTranscript += transcript;
            }
        }
        if(isTextAreaFocused){
            focusedComponent.innerHTML += interimTranscript
        }

    }
}
else{
    console.log("SpeechRecognition is not supported")
}

const getFocusedComponent = ():HTMLElement => {
    return document.activeElement as HTMLElement
}

const isTextArea = (element:HTMLElement):boolean => {
    return element.tagName === 'TEXTAREA'
}