import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY || "mykey";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'Token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user; 
    next();
  });
};

export default authenticateToken
