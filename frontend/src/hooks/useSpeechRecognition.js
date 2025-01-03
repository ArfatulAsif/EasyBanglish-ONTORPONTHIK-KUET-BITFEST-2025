import { useEffect, useState } from "react";

let recognition = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  // recognition.interimResults = true;
  recognition.lang = "bn-BD";
}

const useSpeechRecognition = (content, setContent) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      console.log("onresult event: ", event);
      setText(event.results[0][0].transcript);
      recognition.stop();
      setIsListening(false);
    };
  }, []);

  useEffect(() => {
    if (text !== "") {
      setContent(content + text);
    }
  }, [text]);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
