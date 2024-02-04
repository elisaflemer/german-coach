'use client'
import AnswerPlayer from "./components/AnswerPlayer";
import CoachAnswer from "./components/CoachAnswer";
import Mic from "./components/Mic";
import UserQuestion from "./components/UserQuestion";
import { ConversationContextProvider } from "./context/ConversationContext";


export default function Talk() {

  return (
    <ConversationContextProvider>
      <div className="flex flex-col justify-center items-center h-screen w-full p-10 gap-5">
        <UserQuestion/>
        <CoachAnswer/>
        <Mic />
        <AnswerPlayer/>
      </div>
    </ConversationContextProvider>
  );
}
