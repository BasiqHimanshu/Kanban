"use client"

import { useState } from "react"
import type { Person2 } from "@/mock/people"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface Props {
  person: Person2
  triggerVariant?: "outline" | "ghost" | "default"
  compact?: boolean
}

export function ChatDrawer({ person, triggerVariant = "outline", compact }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([
    { id: 1, sender: "them", text: "Hey! How can I help? 😊" },
    { id: 2, sender: "me", text: "Hi! I have a quick question." },
  ])

  const sendMessage = () => {
    if (!message.trim()) return
    setChat([...chat, { id: Date.now(), sender: "me", text: message }])
    setMessage("")
  }

  return (
    <>
      {/* Trigger */}
      <Button
        variant={triggerVariant}
        size={compact ? "sm" : "default"}
        onClick={() => setIsOpen(true)}
      >
        Message
      </Button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-black/20 z-60"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      {isOpen && (
        <div
          className="
            fixed z-61
            bottom-2 right-4
            w-[350px]
            max-h-[70vh]
            bg-white
            shadow-xl border rounded-t-xl
            flex flex-col
            animate-slide-in-up
          "
        >
          {/* Header */}
          <div className="p-3 border-b flex items-center justify-between bg-secondary/50">
            <div className="flex items-center gap-3">
              <img
                src={person.avatar}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className="font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground">
                  @{person.username} • Online
                </p>
              </div>
            </div>
            <button
              className="p-1 hover:bg-accent rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* CHAT BODY */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`
                  max-w-[80%] px-3 py-2 rounded-lg text-sm
                  ${msg.sender === "me"
                    ? "ml-auto bg-primary text-white"
                    : "mr-auto bg-secondary text-foreground"}
                `}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* MESSAGE INPUT */}
          <div className="p-3 border-t flex gap-2 bg-background">
            <Textarea
              placeholder={`Message ${person.name}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[40px] h-[40px] resize-none"
            />
            <Button onClick={sendMessage} disabled={!message.trim()}>
              Send
            </Button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slide-in-up {
          from {
            transform: translateY(30%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.25s ease-out;
        }
      `}</style>
    </>
  )
}
