"use client";

import { useConversationContext } from "../context/ConversationContext";

const UserQuestion = () => {
  const { currentQuestion } = useConversationContext();
  return (
    <div className="bg-blue-400 p-2">
      <p className="text-black">{currentQuestion}</p>
    </div>
  );
};

export default UserQuestion;
