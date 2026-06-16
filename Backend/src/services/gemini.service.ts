// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });
// console.log("Gemini API Key Loaded:", !!process.env.GEMINI_API_KEY);
// export const generateRepositorySummary =
//   async (
//     readme: string,
//     folderTree: any[]
//   ) => {

//     const limitedReadme =
//       readme.slice(0, 8000);

//     const limitedTree =
//       folderTree
//         .slice(0, 50)
//         .map((item) => item.path);

//     const prompt = `
// You are a senior software architect.

// Analyze this GitHub repository.

// README:
// ${limitedReadme}

// Folder Structure:
// ${limitedTree.join("\n")}

// Return ONLY valid JSON.

// {
//   "projectPurpose": "",
//   "techStack": [],
//   "architecture": "",
//   "folderExplanation": "",
//   "difficulty": ""
// }

// Rules:
// - Return only JSON
// - No markdown
// - No explanation outside JSON
// `;

//     console.log(
//       "Prompt Length:",
//       prompt.length
//     );

//     const response =
//       await ai.models.generateContent({
//         model: "gemini-3.5-flash",
//         contents: prompt,
//       });

//     const text =
//       response.text ?? "";

//     console.log(
//       "Raw AI Response:",
//       text
//     );

//     const cleaned = text
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     return JSON.parse(cleaned);
//   };

// export const analyzeIssue = async (issue: any) => {
//   const prompt = `
// You are a senior open-source maintainer and software engineer.

// Analyze the following GitHub issue.

// Issue Title:
// ${issue.title}

// Issue Description:
// ${issue.body || "No description provided"}

// Your task:
// 1. Explain the issue in simple language.
// 2. Identify the likely root cause.
// 3. Estimate the difficulty level (Easy, Medium, Hard).
// 4. Estimate the time required to solve it.
// 5. Suggest files/modules that are likely involved.
// 6. Create a step-by-step contribution roadmap.

// Return ONLY valid JSON.

// {
//   "problem": "",
//   "rootCause": "",
//   "difficulty": "",
//   "estimatedTime": "",
//   "relevantFiles": [],
//   "roadmap": []
// }

// Do not return markdown.
// Do not use \`\`\`json.
// Return only a valid JSON object.
// `;

//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: prompt,
//   });

//   const text = response.text ?? "";
//   console.log("Raw AI Response for Issue Analysis:", text);

//   const cleaned = text
//     .replace(/```json/g, "")
//     .replace(/```/g, "")
//     .trim();

//   return JSON.parse(cleaned);
// };


import Groq from "groq-sdk";

const ai = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

console.log(
  "Groq API Key Loaded:",
  !!process.env.GROQ_API_KEY
);

export const generateRepositorySummary = async (
  readme: string,
  folderTree: any[]
) => {
  const limitedReadme = readme.slice(0, 8000);

  const limitedTree = folderTree
  .filter(
    (item) =>
      item.type === "tree" &&
      !item.path.startsWith(".")
  )
  .slice(0, 100)
  .map((item) => item.path);

const prompt = `
You are a senior software architect, open-source maintainer, and technical reviewer.

Analyze the following GitHub repository.

README:
${limitedReadme}

Repository Folder Structure:
${limitedTree.join("\n")}

Your Tasks:

1. Identify the primary purpose of the project.
2. Detect the technology stack used.
3. Identify the architecture pattern used.
4. Explain WHY the project follows that architecture.
5. Identify ONLY the most important folders/directories that help developers understand the codebase.
6. Explain the responsibility of each important folder.
7. Estimate the onboarding difficulty for a new contributor.

Folder Selection Rules:

- Use ONLY folders/directories that actually exist in the provided folder structure.
- Do NOT invent folder names.
- Ignore hidden/configuration folders unless they are architecturally important:
  - .github
  - .idea
  - .vscode
  - .git
  - .husky
  - node_modules
  - dist
  - build
  - coverage
- Prefer folders containing:
  - source code
  - backend services
  - frontend code
  - APIs
  - business logic
  - infrastructure
  - deployments
  - operators
  - SDKs
  - integrations
  - CLI tools
- Maximum 8 folders.
- Keys must exactly match folder paths from the repository.

Architecture Rules:

- Choose the most appropriate architecture pattern.
- Examples:
  - MVC
  - MVVM
  - Layered Architecture
  - Clean Architecture
  - Component-Based Architecture
  - Monolithic
  - Microservices
  - Event-Driven Architecture
- Provide a detailed explanation (2-4 sentences) based on repository structure and README.
- Do not give only the architecture name.

Difficulty Rules:

Must be one of:
- Beginner
- Intermediate
- Advanced

Return ONLY valid JSON.

{
  "projectPurpose": "",
  "techStack": [],
  "architecture": {
    "pattern": "",
    "explanation": ""
  },
  "folderExplanation": {
    "folder/path": "responsibility"
  },
  "difficulty": ""
}

Do NOT return markdown.
Do NOT wrap the response in \`\`\`.
Do NOT add any extra text.
Return ONLY a valid JSON object.
`;
  console.log("Prompt Length:", prompt.length);

  const response =
    await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
    });

  const text =
    response.choices?.[0]?.message?.content ?? "{}";

  console.log(
    "Raw AI Response:",
    text
  );

  return JSON.parse(text);
};

export const analyzeIssue = async (
  issue: any
) => {
  const prompt = `
You are a senior open-source maintainer and software engineer.

Analyze the following GitHub issue.

Issue Title:
${issue.title}

Issue Description:
${issue.body || "No description provided"}

Your task:
1. Explain the issue in simple language.
2. Identify the likely root cause.
3. Estimate the difficulty level (Easy, Medium, Hard).
4. Estimate the time required to solve it.
5. Suggest files/modules that are likely involved.
6. Create a step-by-step contribution roadmap.

Return ONLY valid JSON.

{
  "problem": "",
  "rootCause": "",
  "difficulty": "",
  "estimatedTime": "",
  "relevantFiles": [],
  "roadmap": []
}

Rules:
- Return only JSON
- No markdown
- No explanation outside JSON
`;

  const response =
    await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
    });

  const text =
    response.choices?.[0]?.message?.content ?? "{}";

  console.log(
    "Raw AI Response for Issue Analysis:",
    text
  );

  return JSON.parse(text);
};