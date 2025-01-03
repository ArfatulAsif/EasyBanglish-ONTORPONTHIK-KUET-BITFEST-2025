import { Button } from "@nextui-org/react";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import { IoMic } from "react-icons/io5";
import { FaRegStopCircle } from "react-icons/fa";

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
          <div className="flex gap-4 items-center mb-4">
            <Button
              radius="full"
              onPress={startListening}
              color="success"
              className="bg-gradient-to-r from-pink-300 via-purple-500 to-indigo-500 shadow-lg"
              endContent={<IoMic className="text-lg" />}
            ></Button>
            <Button
              radius="full"
              onPress={stopListening}
              color="success"
              className="bg-gradient-to-r from-orange-300 to-red-500 shadow-lg"
              endContent={<FaRegStopCircle className="text-lg" />}
            ></Button>
            {isListening && (
              <h1 className="text-red-500 animate-pulse">Listening...</h1>
            )}
          </div>
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
