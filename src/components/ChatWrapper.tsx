/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Message, useChat } from "ai/react"
import { Messages } from "./Messages"
import { ChatInput } from "./ChatInput"
import { useEffect, useRef } from "react"

type Props = {
  sessionId: string
  initialMessages: Message[]
}

const ChatWrapper = ({ sessionId, initialMessages }: Props) => {

  // * PROVIDED BY VERCEL SDK
  const { messages, handleInputChange, input, handleSubmit, setInput } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages: initialMessages
  })

  // ? Reference to message container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  /*
  useEffect(() => {
    if (messagesEndRef.current) {
      // messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);
  */
  //ref={messagesEndRef} style={{ overflowY: 'auto', maxHeight: '500px' }}

  return (
    <section className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 bg-zinc-800 justify-between flex flex-col " >
        <Messages messages={messages} />

      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </section>
  )
}

export default ChatWrapper