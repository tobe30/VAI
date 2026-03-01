import { useState, useCallback, useEffect } from "react";
import {
  Lightbulb,
  Send,
  RotateCcw,
  Code2,
  MessageCircleQuestion,
  ChevronRight,
} from "lucide-react";
import ChatPanel from "../../components/ChatPanel";
import { fetchQuestion, getHint, submitSolution, getFollowUp } from "../../lib/interviewApi";
import CodeEditor from "../../components/CodeEditor";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Interview({ onEnd, questionType }) {
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [language, setLanguage] = useState("python");
  const [isLoading, setIsLoading] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addMessage = useCallback((role, content) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role, content, timestamp: new Date() },
    ]);
  }, []);

  const loadQuestion = useCallback(
    async (lang) => {
      setIsLoading(true);
      setSubmitted(false);

      const q = await fetchQuestion(questionType);
      setCurrentQuestion(q);

      if (q?.type === "coding" && q?.starterCode) {
        setCode(q.starterCode[lang] || "");
      } else {
        setCode(`# Type your answer here\n\n`);
      }

      addMessage(
        "ai",
        `**${q.title}** (${q.difficulty} · ${
          q.type === "definition" ? "Conceptual" : "Coding"
        })\n\n${q.description}`
      );

      setTimerRunning(true);
      setIsLoading(false);
    },
    [addMessage, questionType]
  );

  useEffect(() => {
    addMessage("system", "🎯 Interview session started. Good luck!");
    loadQuestion(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (currentQuestion?.type === "coding" && currentQuestion?.starterCode) {
      setCode(currentQuestion.starterCode[lang] || "");
    }
  };

  const handleHint = async () => {
    if (isLoading || submitted || !currentQuestion) return;

    addMessage("user", "💡 Requesting a hint...");
    setIsLoading(true);

    const hint = await getHint(code, currentQuestion);
    addMessage("ai", `**Hint:** ${hint}`);

    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (isLoading || submitted || !currentQuestion) return;

    setSubmitted(true);
    setTimerRunning(false);

    addMessage("user", "📤 Submitting for review...");
    setIsLoading(true);

    const feedback = await submitSolution(code, currentQuestion);
    addMessage("ai", `**Feedback:**\n\n${feedback}`);

    const followUp = await getFollowUp(currentQuestion);
    if (followUp) {
      addMessage("ai", `**Follow-up question:** ${followUp}`);
    }

    setIsLoading(false);
  };

  const handleNextQuestion = async () => {
    setSubmitted(false);
    addMessage("system", "➡️ Moving to next question...");
    await loadQuestion(language);
  };

  const difficultyBadgeClass =
    currentQuestion?.difficulty === "Easy"
      ? "badge-success"
      : currentQuestion?.difficulty === "Medium"
      ? "badge-warning"
      : "badge-error";

  const typeLabel =
    currentQuestion?.type === "definition" ? "Conceptual" : "Coding";

  return (
    <div className="flex h-screen flex-col bg-[#0B1220] text-white">
      {/* Top Bar */}
      <header className="flex items-center justify-between border-b border-blue-500/20 bg-[#0F172A]/70 backdrop-blur-sm px-5 py-2.5">
        <div className="flex items-center gap-3">
          <a href="/">
      <img
      src="/assets/vai.png"
            alt="VAI logo"
            className="h-15 w-auto object-contain"
      />

                      </a>

          {currentQuestion && (
            <>
              <div className="h-4 w-px bg-blue-500/20 mx-1" />

              <span className="font-medium text-sm text-white/90">
                {currentQuestion.title}
              </span>

              <span className={`badge badge-sm ${difficultyBadgeClass} font-semibold`}>
                {currentQuestion.difficulty}
              </span>

              <span className="badge badge-sm badge-outline gap-1 border-blue-500/30 text-white/70">
                {currentQuestion.type === "definition" ? (
                  <MessageCircleQuestion size={11} />
                ) : (
                  <Code2 size={11} />
                )}
                {typeLabel}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost btn-sm gap-1.5 text-white/70 hover:text-white"
            onClick={onEnd}
            type="button"
          >
            <RotateCcw size={14} />
            New
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="w-[420px] shrink-0 min-h-0 border-r border-blue-500/20 bg-[#0F172A]/40">
          <ChatPanel messages={messages} isLoading={isLoading} />
        </div>

        {/* Editor side later */}
        <div className="flex-1 bg-[#0B1220]">
            <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            onLanguageChange={handleLanguageChange}
            isCodingQuestion={currentQuestion?.type === "coding"}
            />
        </div>
      </div>

      {/* Bottom Bar */}
      <footer className="flex items-center justify-between border-t border-blue-500/20 bg-[#0F172A]/70 backdrop-blur-sm px-5 py-3">
        <div className="text-xs text-white/60">
          {currentQuestion?.type === "definition"
            ? "Type your explanation in the editor, then submit."
            : "Write your solution, then submit when ready."}
        </div>

        <div className="flex gap-2">
          {submitted && (
            <button
              className="btn btn-outline btn-sm gap-1.5 border-blue-500/40 text-white hover:bg-blue-500/10"
              onClick={handleNextQuestion}
              disabled={isLoading}
              type="button"
            >
              Next Question
              <ChevronRight size={14} />
            </button>
          )}

          <button
            className="btn btn-secondary btn-sm gap-1.5"
            onClick={handleHint}
            disabled={isLoading || submitted}
            type="button"
          >
            <Lightbulb size={14} />
            Hint
          </button>

<button
  className="btn btn-sm gap-1.5 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 shadow-lg shadow-blue-600/20"
  onClick={handleSubmit}
  disabled={isLoading || submitted}
  type="button"
>
  <Send size={14} />
  Submit
</button>
        </div>
      </footer>
    </div>
  );
}