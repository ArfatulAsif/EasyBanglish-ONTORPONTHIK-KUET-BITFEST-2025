const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.jwt_secret_key; // Replace with a secure secret key
const prisma = require("../db");
const log = require("../controllers/history");
const { OPERATION_TYPES } = require("../data/constants");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Log the operation
    const details = `User ${name} creates account.`;
    await log.logOperation(OPERATION_TYPES.CREATE, "User", details);  // Log the update operation

    res.status(201).json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user.", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //.log(email,password)

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "48h",
    });

    // Log the operation
    const details = `User ${user.name} just logged in.`;
    await log.logOperation(OPERATION_TYPES.LOGIN, "User", details);  // Log the update operation

    res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in.", error: error.message });
  }
};

// Find User by Email (Excluding Password)
exports.findUserByEmail = async (req, res) => {
    try {
      const email = req.query.email; // Assuming email is passed as a URL parameter
      console.log(email)
      // Find user by email excluding the password
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          // Add other fields as necessary, but exclude 'password'
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user.", error: error.message });
    }
  };

  exports.findUserByUserId = async (req, res) => {
    try {
      const id = parseInt(req.params.id); 
      const user = await prisma.user.findFirst({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          // Add other fields as necessary, but exclude 'password'
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user.", error: error.message });
    }
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        },
      });
  
      res.status(200).json({ message: "Users fetched successfully.", users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users.", error: error.message });
    }
  };

exports.searchUserAndPdfs = async (req, res) => {
    const { text } = req.body;  // The search text provided in the body (name or email)
    //console.log(text)
    try {
      if (!text) {
        return res.status(400).json({ error: 'Search text is required' }); // 400 Bad Request if no text is provided
      }
  
      // Search for users whose name or email contains the search text (case insensitive)
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: text,
                mode: 'insensitive' // Case-insensitive search
              }
            },
            {
              email: {
                contains: text,
                mode: 'insensitive' // Case-insensitive search
              }
            }
          ]
        },
        include: {
          pdfs: {
            where: {
              visibility: 'public' // Only include public PDFs
            }
          }
        }
      });
  
      // Return the users with their public PDFs
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error during user search:', error.message);
      res.status(500).json({ error: 'Failed to search users' });
    }
  };

// Get analytics for a specific user
exports.getUserAnalytics = async (req, res) => {
  const id = req.user.id;

  try {
    const analytics = await prisma.analytics.findFirst({
      where: { userId: parseInt(id) },
      include: {
        user: true, // Include user details
      },
    });

    if (!analytics) {
      return res.status(404).json({ error: 'Analytics data not found for this user' });
    }

    res.status(200).json({ data: analytics });
  } catch (error) {
    console.error('Error fetching user analytics:', error.message);
    res.status(500).json({ error: 'Failed to fetch user analytics' });
  }
};

// Get analytics for all users
exports.getAllAnalytics = async (req, res) => {
  try {
    const allAnalytics = await prisma.analytics.findMany({
      include: {
        user: true, // Include user details
      },
    });

    if (allAnalytics.length === 0) {
      return res.status(404).json({ error: 'No analytics data found' });
    }

    res.status(200).json({ data: allAnalytics });
  } catch (error) {
    console.error('Error fetching all analytics:', error.message);
    res.status(500).json({ error: 'Failed to fetch all analytics' });
  }
};
  