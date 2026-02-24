import Editor from "@monaco-editor/react";

const LANG_LABELS = {
  typescript: "Php",
  python: "Python",
  javascript: "JavaScript",
};

const MONACO_LANG = {
  typescript: "php",
  python: "python",
  javascript: "javascript",
};

export default function CodeEditor({
  code,
  onChange,
  language,
  onLanguageChange,
  isCodingQuestion,
}) {
  return (
    <div className="flex h-full flex-col bg-[#0F172A] text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-500/20 px-4 py-3">
        <h2 className="font-semibold">
          {isCodingQuestion ? "Code Editor" : "Your Answer"}
        </h2>

        <div className="flex items-center gap-2">
          {Object.keys(LANG_LABELS).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-all border ${
                language === lang
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                  : "bg-gray-800 text-gray-400 hover:text-white border-transparent"
              }`}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={MONACO_LANG[language]}
          value={code}
          onChange={(v) => onChange(v || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}