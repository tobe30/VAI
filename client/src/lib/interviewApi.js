// src/lib/interviewApi.js

// --- Mock Questions + Dummy AI API (Frontend Only) ---

export const CODING_QUESTIONS = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    type: "coding",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\``,
    starterCode: {
      typescript:
        "function twoSum(nums: number[], target: number): number[] {\n  // Your solution here\n  \n}",
      python:
        "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Your solution here\n    pass",
      javascript: "function twoSum(nums, target) {\n  // Your solution here\n  \n}",
    },
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    type: "coding",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

**Example:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\``,
    starterCode: {
      typescript: "function isValid(s: string): boolean {\n  // Your solution here\n  \n}",
      python: "def is_valid(s: str) -> bool:\n    # Your solution here\n    pass",
      javascript: "function isValid(s) {\n  // Your solution here\n  \n}",
    },
  },
  {
    title: "Reverse Linked List",
    difficulty: "Medium",
    type: "coding",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\``,
    starterCode: {
      typescript:
        "class ListNode {\n  val: number;\n  next: ListNode | null;\n  constructor(val?: number, next?: ListNode | null) {\n    this.val = val === undefined ? 0 : val;\n    this.next = next === undefined ? null : next;\n  }\n}\n\nfunction reverseList(head: ListNode | null): ListNode | null {\n  // Your solution here\n  \n}",
      python:
        "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Your solution here\n    pass",
      javascript:
        "class ListNode {\n  constructor(val = 0, next = null) {\n    this.val = val;\n    this.next = next;\n  }\n}\n\nfunction reverseList(head) {\n  // Your solution here\n  \n}",
    },
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    type: "coding",
    description: `Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.

**Example:**
\`\`\`
Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]
\`\`\``,
    starterCode: {
      typescript:
        "function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n  // Your solution here\n  \n}",
      python: "def merge_two_lists(l1, l2):\n    # Your solution here\n    pass",
      javascript: "function mergeTwoLists(l1, l2) {\n  // Your solution here\n  \n}",
    },
  },
  {
    title: "Maximum Subarray",
    difficulty: "Medium",
    type: "coding",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

**Example:**
\`\`\`
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
\`\`\``,
    starterCode: {
      typescript: "function maxSubArray(nums: number[]): number {\n  // Your solution here\n  \n}",
      python: "def max_sub_array(nums: list[int]) -> int:\n    # Your solution here\n    pass",
      javascript: "function maxSubArray(nums) {\n  // Your solution here\n  \n}",
    },
  },
];

export const DEFINITION_QUESTIONS = [
  {
    title: "What is a Hash Table?",
    difficulty: "Easy",
    type: "definition",
    description: `Explain what a **Hash Table** is. In your answer, please cover:

1. What is the underlying data structure?
2. How does hashing work?
3. What is the average time complexity for insert, delete, and lookup?
4. What are hash collisions and how are they handled?

Type your answer in the editor or respond in the chat.`,
    followUps: [
      "Can you explain the difference between chaining and open addressing for collision resolution?",
      "What makes a good hash function?",
      "When would you choose a hash table over a balanced BST?",
    ],
  },
  {
    title: "Explain Big O Notation",
    difficulty: "Easy",
    type: "definition",
    description: `Explain **Big O Notation** and why it matters in software engineering.

Please cover:
1. What does Big O measure?
2. Give examples of O(1), O(n), O(log n), O(n²)
3. What is the difference between best case, worst case, and average case?
4. Why do we drop constants and lower-order terms?`,
    followUps: [
      "What's the difference between Big O, Big Theta, and Big Omega?",
      "Can you analyze the time complexity of binary search?",
    ],
  },
  {
    title: "What is a Stack vs a Queue?",
    difficulty: "Easy",
    type: "definition",
    description: `Compare and contrast **Stacks** and **Queues**.

Please cover:
1. The core principle of each (LIFO vs FIFO)
2. Common operations and their time complexities
3. Real-world use cases for each
4. How would you implement each using an array?`,
    followUps: [
      "How would you implement a queue using two stacks?",
      "What is a priority queue and how does it differ?",
    ],
  },
  {
    title: "What is Recursion?",
    difficulty: "Easy",
    type: "definition",
    description: `Explain **Recursion** in programming.

Please cover:
1. What is a base case and why is it important?
2. What is the call stack and how does recursion use it?
3. What is stack overflow in the context of recursion?
4. Give an example of a problem that is naturally recursive.`,
    followUps: [
      "What is tail recursion and why is it more efficient?",
      "When should you prefer iteration over recursion?",
    ],
  },
  {
    title: "Explain REST vs GraphQL",
    difficulty: "Medium",
    type: "definition",
    description: `Compare **REST** and **GraphQL** as API design paradigms.

Please cover:
1. Core philosophy of each approach
2. How data fetching differs (over-fetching, under-fetching)
3. Pros and cons of each
4. When would you choose one over the other?`,
    followUps: [
      "How does caching differ between REST and GraphQL?",
      "What are N+1 query problems in GraphQL?",
    ],
  },
  {
    title: "What is a Binary Search Tree?",
    difficulty: "Medium",
    type: "definition",
    description: `Explain what a **Binary Search Tree (BST)** is.

Please cover:
1. The BST property and how it organizes data
2. Time complexity for search, insert, and delete (best and worst case)
3. What is a balanced BST and why does it matter?
4. Name a self-balancing BST variant and briefly explain how it works.`,
    followUps: [
      "What happens when a BST becomes unbalanced?",
      "Explain the difference between in-order, pre-order, and post-order traversal.",
    ],
  },
  {
    title: "What are SOLID Principles?",
    difficulty: "Medium",
    type: "definition",
    description: `Explain the **SOLID** principles of object-oriented design.

Please cover each principle:
1. **S** — Single Responsibility
2. **O** — Open/Closed
3. **L** — Liskov Substitution
4. **I** — Interface Segregation
5. **D** — Dependency Inversion

Give a brief example for at least two of them.`,
    followUps: [
      "How do SOLID principles apply in functional programming?",
      "Which SOLID principle is most commonly violated in your experience?",
    ],
  },
  {
    title: "Explain Database Indexing",
    difficulty: "Hard",
    type: "definition",
    description: `Explain how **database indexing** works.

Please cover:
1. What is an index and why does it speed up queries?
2. What data structure is commonly used (B-tree)?
3. What are the trade-offs of adding indexes?
4. What is a composite index and when would you use one?`,
    followUps: [
      "When can an index actually hurt performance?",
      "What is a covering index?",
    ],
  },
];

export const ALL_QUESTIONS = [...CODING_QUESTIONS, ...DEFINITION_QUESTIONS];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// type can be "coding" | "definition" or undefined
export async function fetchQuestion(type) {
  await delay(800);
  const pool = type ? ALL_QUESTIONS.filter((q) => q.type === type) : ALL_QUESTIONS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function getHint(code, question) {
  await delay(1200);

  if (question.type === "definition") {
    const hints = [
      "Try to think about real-world analogies that explain this concept simply.",
      "Don't forget to mention the time and space complexity implications.",
      "Consider comparing it with alternative approaches — interviewers love seeing breadth of knowledge.",
      "Try structuring your answer: definition → how it works → when to use it → trade-offs.",
    ];
    return hints[Math.floor(Math.random() * hints.length)];
  }

  const hints = [
    "Think about using a hash map to store values you've already seen. This can reduce your time complexity from O(n²) to O(n).",
    "Consider edge cases: what happens with an empty input? What about duplicate values?",
    "Try breaking the problem down into smaller steps. What's the first thing you need to check?",
    "Your current approach looks good. Consider whether you need to handle the case where no solution exists.",
  ];
  return hints[Math.floor(Math.random() * hints.length)];
}

export async function submitSolution(code, question) {
  await delay(1500);

  if (question.type === "definition") {
    const feedbacks = [
      `**Good explanation!** You covered the core concepts well.\n\n**Strengths:**\n- Clear structure\n- Mentioned key terminology\n\n**Could improve:**\n- Add a concrete example or analogy\n- Discuss trade-offs more deeply\n- Mention related concepts`,
      `**Solid answer!** You demonstrated strong understanding.\n\n**Strengths:**\n- Thorough coverage of the topic\n- Good use of examples\n\n**Could improve:**\n- Be more concise — interviewers value brevity\n- Connect it to practical engineering decisions`,
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  }

  const feedbacks = [
    `**Good attempt!** Your solution handles the basic case correctly.\n\n**Time Complexity:** O(n²) — Consider using a hash map for O(n).\n**Space Complexity:** O(1)\n\n**Suggestions:**\n- Add input validation\n- Consider edge cases with empty arrays\n- Think about early termination`,
    `**Nice work!** Your code is clean and readable.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)\n\n**Strengths:**\n- Good use of data structures\n- Clean variable naming\n\n**Areas for improvement:**\n- Add comments for complex logic\n- Consider what happens with very large inputs`,
  ];
  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
}

export async function getFollowUp(question) {
  await delay(1000);
  if (question.followUps && question.followUps.length > 0) {
    return question.followUps[Math.floor(Math.random() * question.followUps.length)];
  }
  return null;
}