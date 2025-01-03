import useSpeechRecognition from "../../hooks/useSpeechRecognition";

const SpeechRecognition = ({ content, setContent }) => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition(content, setContent);

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onClick={startListening}>Start</button>
            <button onClick={stopListening}>Stop</button>
          </div>

          {isListening ? <h1>Listening...</h1> : <h1>{text}</h1>}
        </>
      ) : (
        <>
          <h1>no support</h1>
        </>
      )}
    </div>
  );
};

export default SpeechRecognition;
