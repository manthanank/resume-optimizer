import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeResumeAndJD(resumeText, jobDescText) {
  const prompt = `
Compare the following resume and job description. Provide:
- Match score (0-100)
- Missing keywords
- Suggested improvements

Resume:
${resumeText}

Job Description:
${jobDescText}
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

export { analyzeResumeAndJD };
