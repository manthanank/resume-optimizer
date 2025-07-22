const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw error;
  }
}

module.exports = { analyzeResumeAndJD };
