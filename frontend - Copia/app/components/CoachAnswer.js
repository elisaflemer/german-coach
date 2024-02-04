import { useConversationContext } from "../context/ConversationContext";

const CoachAnswer = () => {
  const { currentAnswer } = useConversationContext();
  return (
    <div className="bg-green-400 p-2">
      <p className="text-black">{currentAnswer}</p>
    </div>
  );
};

export default CoachAnswer;
