import { NextRequest, NextResponse } from "next/server";
import { getClient } from "../../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to preprocess the resume text
function preprocessResumeText(resumeText: string): string {
  const relevantSections = resumeText.match(/(Projects|Experience)[\s\S]*?(?=(\n\n|$))/gi);
  return relevantSections ? relevantSections.join("\n\n") : resumeText;
}

// Function to split text into manageable chunks
function splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  const paragraphs = text.split("\n\n");

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxChunkSize) {
      chunks.push(currentChunk);
      currentChunk = "";
    }
    currentChunk += paragraph + "\n\n";
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Function to extract skills from resume text
async function extractSkillsFromResume(resumeText: string): Promise<string[]> {
  const MAX_CHUNK_SIZE = 4000; // Adjust for safety
  const skills: string[] = [];
  const filteredText = preprocessResumeText(resumeText);

  if (filteredText.length > MAX_CHUNK_SIZE) {
    const chunks = splitTextIntoChunks(filteredText, MAX_CHUNK_SIZE);

    for (const chunk of chunks) {
      try {
        const chunkSkills = await extractProjectTechSkills(chunk);
        skills.push(...chunkSkills);
      } catch (error) {
        console.error("Error extracting project skills from chunk:", error);
      }
    }

    return Array.from(new Set(skills)); // Deduplicate
  }

  return await extractProjectTechSkills(filteredText);
}

// Function to interact with OpenAI API
async function extractProjectTechSkills(chunkText: string): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You extract technical skills from project descriptions in resumes. Focus only on programming languages, frameworks, libraries, technologies, tools, databases, and cloud platforms explicitly mentioned. Return a JSON array of unique skills.`,
        },
        {
          role: "user",
          content: `Extract ONLY the technical skills and tech stacks used in projects from the following resume text:
  
          ${chunkText}
  
          Return a JSON array of unique, specific technical skills used in projects. Ensure no duplicates.`,
        },
      ],
      max_tokens: 200, // Limit response size
    });

    const skillsResponse = response.choices[0].message.content;

    // Parse the JSON response
    return JSON.parse(skillsResponse || "[]");
  } catch (error) {
    console.error("Error extracting project skills from chunk:", error);
    return [];
  }
}

// GET route handler
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const client = await getClient();

    // Fetch active resume
    const result = await client.query(
      `SELECT resume_file, resume_title FROM resumes WHERE user_id = $1 AND status = 'Active' LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "No active resume found" }, { status: 404 });
    }

    const resumeFile = result.rows[0].resume_file;

    // Convert resume file to text (this is a placeholder for actual PDF-to-text conversion)
    const resumeText = resumeFile.toString("utf-8");

    // Extract skills
    const extractedSkills = await extractSkillsFromResume(resumeText);

    // Update the database with extracted skills
    await client.query(
      `UPDATE resumes SET extracted_skills = $1 WHERE user_id = $2 AND status = 'Active'`,
      [JSON.stringify(extractedSkills), userId]
    );

    return NextResponse.json({
      skills: extractedSkills,
      message: "Skills extracted successfully",
    });
  } catch (error) {
    console.error("Error in skills extraction:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
