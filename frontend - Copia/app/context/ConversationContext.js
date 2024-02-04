import React, { createContext, useContext, useRef, useState } from "react";

const ConversationContext = createContext();

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const ConversationContextProvider = ({ children }) => {
  const [audioSrc, setAudioSrc] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(""); // [1
  const [currentAnswer, setCurrentAnswer] = useState(""); // [1
  const audioRef = useRef(null);

  const handleUserQuestion = async (blob) => {
    let transcription = await executeTranscriptionRequest(blob);
    setCurrentQuestion(transcription);
    setConversationHistory([...conversationHistory, transcription]);
    let answer = await getAnswer(transcription);
    console.log(answer);
    setConversationHistory([...conversationHistory, answer.text]);
    setCurrentAnswer(answer.text);
    setAudioSrc(`data:audio/mp3;base64,${answer.audio}`);
  };

  const executeTranscriptionRequest = async (blob) => {
    const endpointUrl = "http://localhost:5000/transcribe";

    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.mp3");

      const response = await fetch(endpointUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.transcription;
      } else {
        console.error("Failed to send audio file");
      }
    } catch (error) {
      console.error("Error sending audio file", error);
    }
  };

  const getAnswer = async (question) => {
    const endpointUrl = "http://localhost:5000/chat";

    try {
      const body = { question: question };
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to send question");
      }
    } catch (error) {
      console.error("Error sending question", error);
    }
  };

  const contextValue = {
    handleUserQuestion,
    currentQuestion,
    currentAnswer,
    audioRef,
    audioSrc,
  };

  return (
    <ConversationContext.Provider value={contextValue}>
      {children}
    </ConversationContext.Provider>
  );
};
