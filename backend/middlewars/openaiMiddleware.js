const { OpenAI } = require('openai');
const fs = require('fs-extra');
const sharp = require('sharp');
const os = require('os');
const path = require('path');
const { writeFileSync } = require("fs");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize OpenAI API with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

const openaiMiddleware = {
  /**
   * Analyze an image using OpenAI's models by providing the image file path.
   * @param {string} imagePath - Path to the image file to analyze.
   * @returns {Promise<string>} - The description of the image.
   */
  analyzeImage: async (imageUrl) => {
    try {
      
      // Set the prompt for image analysis
      const prompt = `Analyze the following image and describe it in just 1 line about what it is.`;

      // Send the request to OpenAI API for image analysis
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                {
                  type: "image_url",
                  image_url: {
                    "url": imageUrl,
                  },
                },
              ],
            },
          ],
      });

      // Return the description of the image
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image');
    }
  },

  /**
   * Generate an image based on a given prompt.
   * @param {string} prompt - The prompt describing the image to generate.
   * @returns {Promise<string>} - The URL of the generated image.
   */
  generateImage: async (prompt) => {
    try {
      // Create an image generation request to the OpenAI API
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "512x512",
      });
  
      // Extract the URL of the generated image
      const imageUrl = response.data[0].url;
  
      // Download the image to a temporary file
      const tempFilePath = path.join(__dirname, "generated_image.png");
      const writer = fs.createWriteStream(tempFilePath);
      const imageResponse = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
      });
      imageResponse.data.pipe(writer);
  
      // Wait for the file to finish writing
      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
  
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: "image", // Specify the resource type as 'image'
      });
  
      // Delete the local file after uploading
      fs.unlinkSync(tempFilePath);
  
      // Return the Cloudinary URL
      return uploadResult.secure_url;
    } catch (error) {
      console.error("Error generating image:", error);
      throw new Error("Failed to generate image");
    }
  },

  /**
   * Format input data into JSON using OpenAI's API.
   * @param {string} input - The raw text input to format.
   * @returns {Promise<object>} - The formatted JSON object.
   */
  generateJSON: async (input) => {
    try {
      const prompt = `
        Convert the given Banglish text into proper Bangla language. Based on the content, create the following:
        1. A title in Bangla with a maximum of 3-4 words.
        2. The same title translated into Banglish (phonetic English representation of Bangla).
        3. A caption in Bangla with a length of 1-2 lines.
        4. The same caption translated into Banglish.
        
        Input Banglish Text: "${input}"
        
        Output the result in this JSON format:
        {
          "titleBangla": "Bangla title",
          "titleBanglish": "Banglish title",
          "captionBangla": "Bangla caption",
          "captionBanglish": "Banglish caption"
        }
      `;

      // Request OpenAI API to process the text and generate the required JSON
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500, // Adjust token usage as per need
      });
  
      // Get the raw response content
      let jsonString = response.choices[0].message.content;
      // console.log('Raw response:', jsonString);
  
      // Ensure JSON starts from '{' and ends at '}'
      const jsonStart = jsonString.indexOf('{');
      const jsonEnd = jsonString.lastIndexOf('}') + 1;
  
      // Extract the JSON portion
      jsonString = jsonString.slice(jsonStart, jsonEnd);
  
      // Parse and return the JSON
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error generating Bangla JSON:', error);
  
      // Return a fallback for invalid JSON formatting or unexpected errors
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse JSON response');
      }
      throw new Error('Failed to generate JSON');
    }
  },  


  generateJSONFirstMessage: async (input) => {
    try {
      const prompt = `
        Provide a JSON object with the following fields:
        - "title": A title summarizing the given input in Bangla.
        - "message": A perfect Bangla response to the input.
  
        Input: "${input}"
  
        Ensure the output is strictly a JSON object in this format: {"title": "", "message": ""}.
      `;
  
      // Call external AI API for generating JSON
      // const response = await axios.post(`${process.env.base_url}/ai/generated-text`, {
      //   prompt
      // });

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150, // Limit the token usage for the response
      });
  
      // Extract response content
      let jsonString = response.choices[0].message.content;
      console.log(jsonString)
  
      // Ensure JSON starts from '{' and ends at '}'
      const jsonStart = jsonString.indexOf('{');
      const jsonEnd = jsonString.lastIndexOf('}') + 1;
      jsonString = jsonString.slice(jsonStart, jsonEnd);
  
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error generating JSON:', error);
  
      // Return a fallback for invalid JSON formatting or unexpected errors
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse JSON response');
      }
      throw new Error('Failed to generate JSON');
    }
  },
  

  /**
   * Generate voice-ready text based on a given input.
   * @param {string} text - The text to prepare for voice synthesis.
   * @returns {Promise<string>} - The prepared text for voice generation.
   */
  generateVoiceText: async (text) => {
    try {
      // Set the prompt to convert text into suitable transcription for voice synthesis
      const prompt = `Convert the following text into a suitable transcription or text prompt for voice synthesis:\n\n${text}`;

      // Create a chat completion request to OpenAI API for generating voice text
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });

      // Return the generated voice-ready text
      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating voice text:', error);
      throw new Error('Failed to generate voice text');
    }
  },

  generateVoice: async(prompt)=> {
    try {
      
      // Generate an audio response to the given prompt
      const response = await openai.chat.completions.create({
        model: "gpt-4o-audio-preview",
        modalities: ["text", "audio"],
        audio: { voice: "alloy", format: "wav" },
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      });

      // Write audio data to a temporary file
      const tempFilePath = path.join(__dirname, "voice.wav");
      fs.writeFileSync(
        tempFilePath,
        Buffer.from(response.choices[0].message.audio.data, "base64")
      );

      // Upload the file to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: "video", // For audio files, Cloudinary uses 'video' resource type
      });

      // Delete the local file after uploading
      fs.unlinkSync(tempFilePath);

      // Return the Cloudinary URL
      return uploadResult.secure_url;

    } catch (error) {
      console.error('Error generating voice:', error);
      throw new Error('Failed to generate voice');
    }
  },

  generateText: async (prompt) => {
    try {
        // Generate a text response to the given prompt in Bangla
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: `You will receive a message in Bangla, Banglish, or English. Your task is to provide a meaningful response in perfect Bangla. Here is the message: "${prompt}.
                    Just give the response. No extra word."`
                },
            ],
        });

        // Extract the generated text
        const generatedText = response.choices[0].message.content;

        // Return the generated text
        return generatedText;
    } catch (error) {
        console.error("Error generating text:", error);
        throw new Error("Failed to generate text");
    }
  },

  generateTextWithSpellCheck: async(prompt) =>{
    try {
      // Generate a text response to the given prompt in Bangla with spell check for Banglish
      const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
              {
                  role: "user",
                  content: `You will receive a message in Bangla, Banglish, or English. Your task is to provide the conversion of banglish into perfect Bangla without any grammatical error.
                  It should be meaningful. Additionally, 
                  check if there are any spelling errors in the Banglish text and provide a JSON response with two fields:
                  - bangla: The generated Bangla response.
                  - spelling: An array of objects with "wrong" (incorrect word) and "correction" (corrected word).
                  If there are no errors, return an empty array in the spelling field. Here is the message: "${prompt}". Just give the response. No extra words.`
              },
          ],
      });

      // Extract the generated text and spell-check data
      const generatedText = response.choices[0].message.content;

      // Assuming the AI response returns a structure like:
      // {
      //     "bangla": "Generated Bangla text",
      //     "spelling": [{"wrong": "word1", "correction": "word2"}]
      // }
      const result = JSON.parse(generatedText);

      // Return the JSON response with generated Bangla text and spelling errors
      return {
          bangla: result.bangla,
          spelling: result.spelling || []  // Default to an empty array if no errors
      };

    } catch (error) {
        console.error("Error generating text with spell check:", error);
        throw new Error("Failed to generate text with spell check");
    }
  },

  generateTextPdfSearch: async(text) =>{
    try {
      if (!text) {
          throw new Error('Search text is required'); // Ensure text is provided
      }

      // Find all public PDFs (no text filtering)
      const pdfs = await prismaClient.pdf.findMany({
          where: {
              visibility: 'public' // Only public PDFs
          },
          include: {
              user: true // Include user details from the User table (PDF maker name)
          }
      });

      if (pdfs.length === 0) {
          throw new Error('No public PDFs found');
      }

      // Prepare the PDF data for AI processing
      const pdfData = pdfs.map(pdf => ({
          pdfMakerName: pdf.user.name,
          pdfTitle: pdf.titleBangla,
          pdfCaption: pdf.captionBangla
      }));

      // Format the AI prompt based on the found PDFs
      const aiPrompt = `You have a list of PDFs with the following details. Your task is to analyze the user's input and provide the best answer based on the information in these PDFs.\n\nPDFs: \n${JSON.stringify(pdfData)}\n\nUser's question: "${text}".\n\nProvide the most relevant answer based on these PDFs.
       After giving the answer, also reference the PDF it was derived from, including the PDF maker's name and title. Give the solution in maximum 4 lines.`;

      // Call the AI model to generate the response
      const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
              {
                  role: "user",
                  content: aiPrompt
              }
          ]
      });

      const generatedAnswer = response.choices[0].message.content;

      // Return the generated answer with the PDF reference
      return  generatedAnswer

    } catch (error) {
        console.error("Error during PDF search and AI generation:", error.message);
        throw new Error('Failed to generate response');
    }
  },

  trainBanglishToBangla: async (banglish, bangla) => {
    try {
        // Train the GPT model with Banglish and Bangla mapping
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: `Here is a pair of phrases. The first is in Banglish, and the second is its actual Bangla translation. Your task is to acknowledge this input and learn from it. Do not provide a response other than "Okay". Banglish: "${banglish}", Bangla: "${bangla}".`
                },
            ],
        });

        // Extract the acknowledgment response
        const acknowledgment = response.choices[0].message.content;

        // Return the acknowledgment
        return acknowledgment;
    } catch (error) {
        console.error("Error training with Banglish to Bangla pair:", error);
        throw new Error("Failed to train Banglish to Bangla pair");
    }
  },

};

module.exports = openaiMiddleware;
