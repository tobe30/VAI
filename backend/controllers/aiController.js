import OpenAI from "openai";
import { InterviewTurn, InterviewSession } from "../models/Interview.js"; // make sure you export both

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Start a new interview session and ask the first question
export const aiInterviewer = async (req, res) => {
  try {
    const { userId, track = "general", difficulty = "medium" } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const session = await InterviewSession.create({ userId, track, difficulty });

    const system = `
You are a senior technical interviewer running a mixed interview:
- Some turns are CONCEPTUAL (short answers, reasoning, tradeoffs).
- Some turns are CODING (write code; evaluate with provided run output).
Rules:
- Ask one question at a time.
- Choose next_type: conceptual or coding.
- Return ONLY valid JSON (no markdown, no backticks).

Return JSON format:
{
  "type": "conceptual|coding",
  "question": "string",
  "difficulty": "easy|medium|hard"
}
`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Start an interview. Track: ${track}. Difficulty: ${difficulty}. Ask the first question.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    const raw = response.choices?.[0]?.message?.content?.trim() || "";// Get the raw content of the AI's response. This should be a JSON string containing the first question and its type. We will parse this next.

    // Gemini sometimes wraps JSON in ```json ... ```
    const clean = raw.replace(/```json|```/g, "").trim();//Removes weird ```json blocks that Gemini sometimes adds around the JSON response. This ensures we have clean JSON to parse.
    const first = JSON.parse(clean);

    // let first;
    // try {
    //   first = JSON.parse(clean);
    // } catch (e) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "AI returned invalid JSON",
    //     raw,
    //   });
    // }

    // Optional: validate fields
    if (!first?.type || !first?.question) {
      return res.status(500).json({
        success: false,
        message: "AI response missing required fields",
        data: first,
      });
    }

    // Store first question as a turn (optional)
    await InterviewTurn.create({
      sessionId: session._id,
      type: first.type,
      question: first.question,
      difficulty: first.difficulty || difficulty,
    });

    session.lastQuestion = first.question;
    session.lastType = first.type;
    session.turnCount = 1;
    await session.save();

    return res.json({
      success: true,
      sessionId: session._id,
      question: first.question,
      type: first.type,
      difficulty: first.difficulty || difficulty,
    });
  } catch (error) {
    console.error("Error in aiInterviewer:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Receive candidate's answer, provide feedback, and ask the next question

export const interviewTurn = async (req, res) => {
  try {
    const { sessionId, type, answerText, candidateCode, language = "javascript", runOutput } = req.body;

    if (!sessionId || !type) {
      return res.status(400).json({ success: false, message: "sessionId and type are required" });
    }

    const session = await InterviewSession.findById(sessionId);
    if (!session || session.status !== "active") {
      return res.status(404).json({ success: false, message: "Session not found or ended" });
    }

    const currentQuestion = session.lastQuestion;
    if (!currentQuestion) {
      return res.status(400).json({ success: false, message: "No active question in session" });
    }

    // Validate payload by type
    if (type === "conceptual" && !answerText) {
      return res.status(400).json({ success: false, message: "answerText is required for conceptual turns" });
    }
    if (type === "coding" && !candidateCode) {
      return res.status(400).json({ success: false, message: "candidateCode is required for coding turns" });
    }

    const system = `
You are a senior technical interviewer running a mixed interview (CONCEPTUAL + CODING).
Rules:
- Evaluate the candidate response to the CURRENT QUESTION.
- Score 0-10.
- Provide strengths/weaknesses.
- Decide next_action: FOLLOW_UP, NEXT_QUESTION, END.
- Decide next_type: conceptual or coding.
- If NEXT_QUESTION or FOLLOW_UP, provide next_question (one question only).
Return ONLY valid JSON (no markdown):
{
  "feedback": "string",
  "score": 0,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "next_action": "FOLLOW_UP|NEXT_QUESTION|END",
  "next_type": "conceptual|coding",
  "next_question": "string or empty"
}
`;

    const userMsg =
      type === "conceptual"
        ? `
CURRENT QUESTION:
${currentQuestion}

CANDIDATE ANSWER:
${answerText}

Track: ${session.track}
Difficulty: ${session.difficulty}
`
        : `
CURRENT QUESTION:
${currentQuestion}

LANGUAGE:
${language}

CANDIDATE CODE:
${candidateCode}

EXECUTION OUTPUT:
${runOutput || "No run output provided"}

Track: ${session.track}
Difficulty: ${session.difficulty}
`;

    const resp = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      temperature: 0.4,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
    });


    const raw = resp.choices[0].message.content?.trim() || "";
    const clean = raw.replace(/```json|```/g, "").trim();

    let result;
    try {
      result = JSON.parse(clean);
    } catch {
      return res.status(500).json({ success: false, message: "AI returned invalid JSON", raw });
    }

    // Save candidate turn + AI evaluation
    await InterviewTurn.create({
      sessionId: session._id,
      type,
      question: currentQuestion,
      answerText: type === "conceptual" ? answerText : undefined,
      candidateCode: type === "coding" ? candidateCode : undefined,
      language: type === "coding" ? language : undefined,
      runOutput: type === "coding" ? runOutput : undefined,
      aiFeedback: result.feedback,
      score: result.score,
      nextAction: result.next_action,
      nextType: result.next_type,
      nextQuestion: result.next_question,
      difficulty: session.difficulty,
    });

    // Update session state
    if (result.next_action === "END") {
      session.status = "ended";
      session.lastQuestion = null;
      session.lastType = null;
    } else {
      session.lastQuestion = result.next_question;
      session.lastType = result.next_type;
      session.turnCount += 1;
    }

    await session.save();

    return res.json({
      success: true,
      data: {
        feedback: result.feedback,
        score: result.score,
        strengths: result.strengths,
        weaknesses: result.weaknesses,
        next_action: result.next_action,
        next_type: result.next_type,
        next_question: result.next_question,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Interview turn failed" });
  }
};