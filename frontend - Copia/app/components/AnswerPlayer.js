import { useConversationContext } from "../context/ConversationContext"

const AnswerPlayer = () => {
  const { audioSrc, audioRef } = useConversationContext()
  return (
    <div>
          <div className="mt-2">
            {audioSrc && (
              <audio
                autoPlay={true}
                src={audioSrc}
                ref={audioRef}
                className="hidden"
              />
            )}
          </div>
    </div>
  )
}

export default AnswerPlayer