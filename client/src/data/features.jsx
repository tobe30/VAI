export const featuresData = [
{
  icon: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v5a3 3 0 0 0 3 3"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v5a3 3 0 0 1-3 3"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 7h6M9 11h6M9 15h6"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="brainGradient"
          x1="12"
          y1="3"
          x2="12"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
    </svg>
  ),
  title: "AI-Powered Interviewer",
  description:
    "Realistic conversational AI that adapts to your skill level and provides targeted follow-ups.",
},

{
  icon: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Editor window */}
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
        stroke="url(#editorGradient)"
        strokeWidth="1.5"
      />

      {/* Top bar dots */}
      <circle cx="7" cy="8" r="0.8" fill="#3b82f6" />
      <circle cx="10" cy="8" r="0.8" fill="#93c5fd" />
      <circle cx="13" cy="8" r="0.8" fill="#bfdbfe" />

      {/* Code symbols */}
      <path
        d="M9 13l-2 2 2 2"
        stroke="url(#editorGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 13l2 2-2 2"
        stroke="url(#editorGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17l2-6"
        stroke="url(#editorGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient
          id="editorGradient"
          x1="12"
          y1="4"
          x2="12"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
    </svg>
  ),
  title: "Live Code Editor",
  description:
    "Collaborate in real-time with syntax highlighting and multi-language support.",
},

{
  icon: (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 4c-2.2 0-4 1.8-4 4v1c-1.1.3-2 1.4-2 2.6 0 1.3.9 2.4 2 2.7V16c0 2.2 1.8 4 4 4"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 4c2.2 0 4 1.8 4 4v1c1.1.3 2 1.4 2 2.6 0 1.3-.9 2.4-2 2.7V16c0 2.2-1.8 4-4 4"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9c1.5 1 4.5 1 6 0"
        stroke="url(#brainGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient
          id="brainGradient"
          x1="12"
          y1="4"
          x2="12"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#93c5fd" />
        </linearGradient>
      </defs>
    </svg>
  ),
  title: "Conceptual Questions",
  description:
    "Master data structures, algorithms, and system design through clear, definition-based questions.",
}

];
