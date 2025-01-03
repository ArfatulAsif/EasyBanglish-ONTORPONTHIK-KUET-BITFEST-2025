const openaiMiddleware = require('../middlewars/openaiMiddleware'); // Import the OpenAI middleware
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

// ImgBB API key from .env file
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

// Configure Multer to handle file uploads
const storage = multer.memoryStorage(); // Use memoryStorage instead of diskStorage

const upload = multer({ storage });
/**
 * Analyze an image using OpenAI's models.
 * Expects an image file in the `image` field of the request.
 */
exports.analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      //console.log('File uploaded successfully:', req.file);
  
      // Create a new FormData instance
    const formData = new FormData();
  
      // Get the path of the uploaded file
    const filePath = path.join(__dirname,"..", req.file.path);
      //console.log(filePath)
      // Append the file to FormData using a readable stream
    formData.append('image', fs.createReadStream(filePath), req.file.originalname);
      // Send the form data to ImgBB
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
          params: {
            key: IMGBB_API_KEY,
          },
        }
      );
  
      // Extract the image URL from ImgBB response
    const imageUrl = response.data.data.url;
    const description = await openaiMiddleware.analyzeImage(imageUrl);

    // Delete the file from the 'uploads' directory
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err.message);
        } else {
          console.log('File deleted successfully');
        }
    });

    res.status(200).json({ description });
  } catch (error) {
    console.error('Error analyzing image:', error.message);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
};

/**
 * Generate an image based on a given prompt.
 * Expects a `prompt` field in the request body.
 */
exports.generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' }); // 400 Bad Request
    }
    const imageUrl = await openaiMiddleware.generateImage(prompt);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error.message);
    res.status(500).json({ error: 'Failed to generate image' });
  }
};

/**
 * Format input data into JSON using OpenAI's API.
 * Expects a `text` field in the request body.
 */
exports.generateJSON = async (req, res) => {
  const { text } = req.body;

  try {
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' }); // 400 Bad Request
    }
    const jsonData = await openaiMiddleware.generateJSON(JSON.parse(text));
    res.status(200).json({ jsonData });
  } catch (error) {
    console.error('Error generating JSON:', error.message);
    res.status(500).json({ error: 'Failed to generate JSON' });
  }
};

exports.generateJSONFirstMessage = async (req, res) => {
  const { text } = req.body;
  //console.log(text, "aise");

  try {
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' }); // 400 Bad Request
    }
    const jsonData = await openaiMiddleware.generateJSONFirstMessage(text);
    res.status(200).json({ jsonData });
  } catch (error) {
    console.error('Error generating JSON:', error.message);
    res.status(500).json({ error: 'Failed to generate JSON' });
  }
};


// API endpoint to handle audio generation and response
exports.getVoice = async (req, res) => {
  try {
    const { prompt } = req.body; // Expecting a JSON payload with 'prompt'
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Generate the voice file
    const fileUrl = await openaiMiddleware.generateVoice(prompt);

    // Send the Cloudinary URL in the response
    res.status(200).json({ audio: fileUrl });

  } catch (error) {
    console.error("Error handling voice request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};

// API endpoint to handle text generation and response
exports.getText = async (req, res) => {
    try {
      const { prompt } = req.body; // Expecting a JSON payload with 'prompt'
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
  
      // Generate the voice file
      const txt = await openaiMiddleware.generateText(prompt);
  
      // Send the Cloudinary URL in the response
      res.status(200).json({ text: txt });
  
    } catch (error) {
      console.error("Error handling text request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  };