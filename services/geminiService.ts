
import { GoogleGenAI, Type } from "@google/genai";
import type { ScriptData, GeneratedScript, ScriptLine } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScript = async (data: ScriptData): Promise<GeneratedScript> => {
  const {
    companyName,
    productDescription,
    sellingPoints,
    targetAudience,
    callToAction,
    tagline,
    duration,
  } = data;

  const prompt = `
    You are a professional audio ad scriptwriter, specializing in creating compelling and concise scripts for radio, TV, and social media.
    Your task is to generate a complete audio ad script based on the user's input. The script should be engaging, professional, and follow a clear structure with distinct parts for narration, music cues, and sound effects (SFX).

    The output MUST be a single, valid JSON object, without any markdown formatting or code fences.

    Here is the user's input:
    - Company/Product Name: ${companyName}
    - Product/Service Description: ${productDescription}
    - Key Selling Points: ${sellingPoints}
    - Target Audience/Tone: ${targetAudience}
    - Call to Action: ${callToAction}
    - Tagline: "${tagline}"
    - Desired Ad Duration: Approximately ${duration} seconds.

    Generate a script that logically flows, starting with an intro, building interest, presenting the offer, and ending with a strong call to action and tagline.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A catchy title for the ad script."
            },
            script: {
              type: Type.ARRAY,
              description: "An array of script lines, each with a type and content.",
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    description: "The type of script line: NARRATOR, MUSIC, or SFX."
                  },
                  content: {
                    type: Type.STRING,
                    description: "The content of the script line, e.g., the narrator's dialogue, music cue, or sound effect description."
                  }
                },
                required: ["type", "content"]
              }
            }
          },
          required: ["title", "script"]
        },
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson: GeneratedScript = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedJson.title || !Array.isArray(parsedJson.script)) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return parsedJson;

  } catch (error) {
    console.error("Error generating script from Gemini API:", error);
    throw new Error("Failed to generate script. The AI model may have returned an invalid format. Please try again.");
  }
};
