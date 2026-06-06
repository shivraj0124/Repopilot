import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generateRepositorySummary = async (
  readme: string,
  folderTree: any[]
) => {
  const prompt = `
Analyze this repository.

README:
${readme}

Folder Structure:
${JSON.stringify(folderTree.slice(0,100))}

Return ONLY valid JSON.

{
  "projectPurpose": "",
  "techStack": [],
  "architecture": "",
  "folderExplanation": "",
  "difficulty": ""
}
`;

  const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: prompt,
});

const text = response.text ?? "";

const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned);
};


export const analyzeIssue = async (issue: any) => {
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

Do not return markdown.
Do not use \`\`\`json.
Return only a valid JSON object.
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  const text = response.text ?? "";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};