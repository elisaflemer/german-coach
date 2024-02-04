"use client";

import { useRef, useState } from "react";

import { useConversationContext } from "../context/ConversationContext";

export default function Mic() {
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null);
  const { handleUserQuestion } = useConversationContext();

  const startRecording = async () => {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new MediaRecorder(stream);
      let chunks = [];

      recorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
        if (recorderRef.current.state === "inactive") {
          let blob = new Blob(chunks, { type: "audio/mp3" });
          setIsRecording(false);
          handleUserQuestion(blob);
        }
      };

      recorderRef.current.start();
      setIsRecording(true); // Update recording status
    } catch (e) {
      console.log("error getting stream", e);
      setIsRecording(false); // Update recording status in case of an error
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
      setIsRecording(false); // Update recording status
    }
  };

  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        isRecording ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? "Stop Recording" : "Record"}
    </button>
  );
}
