import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

export default function ChatPanel({ messages = [], isLoading = false }) {
  const endRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const isAi = (role) => role === "ai" || role === "system";
  const isUser = (role) => role === "user";

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0F172A] text-white relative z-10">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-blue-500/20 px-5 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
          <Bot size={14} className="text-blue-400" />
        </div>
        <h2 className="text-sm font-semibold">AI Interviewer</h2>
      </div>

      {/* Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 pointer-events-auto"
        onWheelCapture={(e) => {
          // ✅ force scroll inside this panel
          if (!scrollRef.current) return;
          e.stopPropagation();
          scrollRef.current.scrollTop += e.deltaY;
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${isUser(msg.role) ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                isAi(msg.role)
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-gray-700 text-white"
              }`}
            >
              {isAi(msg.role) ? <Bot size={14} /> : <User size={14} />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed border ${
                isUser(msg.role)
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>
              <div className="mt-1.5 text-[10px] text-gray-400">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Bot size={14} />
            </div>
            <div className="rounded-xl bg-gray-800 border border-gray-700 px-4 py-3">
              <span className="text-sm text-gray-400">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}