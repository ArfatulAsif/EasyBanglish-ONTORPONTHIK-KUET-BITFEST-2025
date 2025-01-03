const { OpenAI } = require('openai');
const fs = require('fs-extra');
const sharp = require('sharp');
const os = require('os');
const path = require('path');
const { writeFileSync } = require("fs");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");

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
        2. A caption in Bangla with a length of 1-2 lines.
        3. Provide the full paragraph in Bangla as an HTML string.
    
        Input Banglish Text: "${input}"
    
        Output the result in this JSON format:
        {
          "title": "Bangla title",
          "caption": "Bangla caption",
          "contentHtml": "<p>Bangla content in HTML format</p>"
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
      console.log('Raw response:', jsonString);
  
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

  
};

module.exports = openaiMiddleware;
