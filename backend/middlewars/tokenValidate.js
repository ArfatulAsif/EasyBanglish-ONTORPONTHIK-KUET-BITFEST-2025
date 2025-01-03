const jwt = require('jsonwebtoken');

exports.tokenValidate = (role) => {
  return (req, res, next) => {
    const token = req.query.token;
    //console.log(token)
    //const id = req.body.user_id;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token is required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.jwt_secret_key);
      console.log(decoded)
      if (decoded.role !== role) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }

      req.user = decoded; // Attach decoded token data to request
      next();
    } catch (error) {
      console.error('Token validation error:', error);
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
  };
};
