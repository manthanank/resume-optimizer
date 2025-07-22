const { extractText } = require('../utils/fileParser');
const { analyzeResumeAndJD } = require('../utils/gemini');

exports.analyze = async (req, res) => {
  try {
    const resumeFile = req.files?.resume?.[0];
    const jdFile = req.files?.jobDesc?.[0];
    const jdText = req.body.jobDescText;

    if (!resumeFile || (!jdFile && !jdText)) {
      return res.status(400).json({ message: 'Resume and job description are required.' });
    }

    const resumeText = await extractText(resumeFile);
    const jobDesc = jdText?.trim()
      ? jdText
      : await extractText(jdFile);

    const analysis = await analyzeResumeAndJD(resumeText, jobDesc);

    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: 'Failed to analyze resume', error: error.message });
  }
};

